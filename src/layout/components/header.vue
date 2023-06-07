<script lang="ts" setup>

import { useRoute } from 'vue-router';
import { NRadioGroup, NInput } from 'naive-ui';
import { FormConfig } from '@/components/Form/types';
import { useAppStore } from '@/store/modules/app';
import { GENDER } from '@/config/enum';
import { modifyAccountByToken, changePassword } from '@/api/public';
import { isPhone, isEmail, isNewPwd } from '@/utils/validate';
const route = useRoute();
const appStore = useAppStore();
const userFormRef = ref();
const pwdFormRef = ref();

const pwdSource = () => {
  return {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  };
};

const refOption = reactive({
  userForm: {
    username: '',
    name: '',
    email: '',
    mobile: '',
    gender: null
  },
  pwdForm: pwdSource()
});

const { userForm, pwdForm } = toRefs(refOption);

const userConfig: FormConfig<typeof userForm.value>[] = [
  {
    type: 'component',
    component: NInput,
    key: 'name',
    label: '姓名',
    span: 24,
    props: {
      placeholder: '请输入姓名'
    },
    itemProps: {
      labelWidth: 'auto'
    }
  },
  {
    type: 'component',
    component: NRadioGroup,
    key: 'gender',
    label: '性别',
    span: 24,
    options: [
      ...GENDER
    ],
    itemProps: {
      labelWidth: 'auto'
    }
  },
  {
    type: 'component',
    component: NInput,
    key: 'mobile',
    label: '手机号',
    span: 24,
    props: {
      placeholder: '请输入手机',
      maxlength: 11
    },
    itemProps: {
      labelWidth: 'auto',
      rule: [
        { validator: (rule, value) => {
          return new Promise<void>((resolve, reject) => {
            if(!isPhone(value)) {
              reject(Error('请输入正确的手机号'));
            }else {
              resolve();
            }
          });
        }, required: true, trigger: ['blur'] }
      ]
    }
  },
  {
    type: 'component',
    component: NInput,
    key: 'email',
    span: 24,
    label: '邮箱',
    props: {
      placeholder: '请输入邮箱'
    },
    itemProps: {
      labelWidth: 'auto',
      rule: [
        { validator: (rule, value) => {
          return new Promise<void>((resolve, reject) => {
            if(!isEmail(value)) {
              reject(Error('请输入正确的邮箱'));
            }else {
              resolve();
            }
          });
        }, required: false, trigger: ['blur'] }
      ]
    }
  }
];

const pwdConfig: FormConfig<typeof pwdForm.value>[] = [
  {
    type: 'component',
    component: NInput,
    key: 'oldPassword',
    label: '旧密码',
    span: 24,
    props: {
      placeholder: '请输入旧密码',
      type: 'password'
    },
    itemProps: {
      labelWidth: 'auto',
      rule: [
        { required: true, trigger: ['blur', 'input'], message: '请输入旧密码' }
      ]
    }
  },
  {
    type: 'component',
    component: NInput,
    key: 'newPassword',
    label: '新密码',
    span: 24,
    props: {
      placeholder: '请输入新密码',
      type: 'password'
    },
    itemProps: {
      labelWidth: 'auto',
      rule: [
        { validator: (rule, value) => {
          return new Promise<void>((resolve, reject) => {
            if(value === pwdForm.value.oldPassword) {
              reject(Error('新密码不能与旧密码相同'));
            } else if(!isNewPwd(value)) {
              reject(Error('请输入8-20位数字、字母、特殊字符的组合'));
            } else {
              resolve();
            }
          });
        }, required: true, trigger: ['blur'] }
      ]
    }
  },
  {
    type: 'component',
    component: NInput,
    key: 'confirmPassword',
    label: '确定密码',
    span: 24,
    props: {
      placeholder: '确认新密码',
      type: 'password'
    },
    itemProps: {
      labelWidth: 'auto',
      rule: [
        { validator: (rule, value) => {
          return new Promise<void>((resolve, reject) => {
            if(value !== pwdForm.value.newPassword) {
              reject(Error('两次密码不一致'));
            } else {
              resolve();
            }
          });
        }, required: true, trigger: ['blur'] }
      ]
    }
  }
];

const logOut = () => {
  window.$dialog?.success({
    title: '提示',
    content: '此操作将注销当前账户信息，是否继续?',
    positiveText: '确定',
    negativeText: '取消',
    showIcon: false,
    onPositiveClick: async() => {
      appStore.logout();
    }
  });
};

const clickUserConfirm = async() => {
  await userFormRef.value.validate().catch(() => {
    return Promise.reject(false);
  });
  const params = {
    ...userForm.value,
    id: appStore.userId
  };
  await modifyAccountByToken(params);
  appStore.getUserInfo();
  window.$message?.success('修改个人资料成功');
};

const clickUserCancel = () => {
  userForm.value = {
    ...JSON.parse(JSON.stringify(appStore.userInfo))
  };
};

const clickPwdConfirm = async() => {
  await pwdFormRef.value.validate().catch(() => {
    return Promise.reject(false);
  });
  await changePassword(pwdForm.value);
  window.location.reload();
  window.$message?.success('修改密码成功');
};

const clickPwdCancel = () => {
  pwdForm.value = pwdSource();
};

onMounted(() => {
  setTimeout(() => {
    userForm.value = {
      ...userForm.value,
      ...JSON.parse(JSON.stringify(appStore.userInfo))
    };
  }, 400);
});

</script>

<template>
  <div class="header-nav h-header bg-navBg flex justify-between items-center px-small">
    <div class="flex items-center">
      <div
        class="h-full flex items-center mr-small hover:bg-primary"
        @click="appStore.toggleCollapsed"
      >
        <Icon
          size="20"
          :name=" appStore.collapsed ? 'open' : 'close' "
        />
      </div>
      <span class="text-large">{{ route.meta.title }}</span>
    </div>
    <div class="right">
      <n-popconfirm
        :show-icon="false"
        @positive-click="clickUserConfirm"
        @negative-click="clickUserCancel"
      >
        <template #trigger>
          <n-button
            quaternary
          >
            当前帐号: {{ userForm.username }}
          </n-button>
        </template>
        <Form
          ref="userFormRef"
          v-model:data="userForm"
          :config="userConfig"
        />
      </n-popconfirm>
      <n-divider vertical />
      <n-popconfirm
        :show-icon="false"
        @positive-click="clickPwdConfirm"
        @negative-click="clickPwdCancel"
      >
        <template #trigger>
          <n-button
            quaternary
          >
            修改密码
          </n-button>
        </template>
        <Form
          ref="pwdFormRef"
          v-model:data="pwdForm"
          :config="pwdConfig"
        />
      </n-popconfirm>

      <n-divider vertical />
      <n-button
        quaternary
        @click="logOut"
      >
        退出
      </n-button>
    </div>
  </div>
</template>

<style lang="scss">
.header-nav{
  .right{
    .n-divider{
      background-color: #444;
    }
    .n-button__content{
      color: #87a3b0;
      font-size: 12px;
    }
  }
}
</style>
