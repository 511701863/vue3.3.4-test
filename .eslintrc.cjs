module.exports = {
  root: true,
  env: {
    es2021: true,
    browser: true,
    node: true
  },
  extends: [
    'vue-global-api',
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 13,
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: [
    'vue',
    '@typescript-eslint'
  ],
  rules: {
    // 强制使用单引号
    quotes: [2, 'single'],
    // 强制使用分号
    semi: [2, 'always'],
    'prefer-const': 'error',
    // 强制对象最后不加逗号
    'comma-dangle': [2, 'never'],
    // 强制逗号前无空格，逗号后有空格
    'comma-spacing': [2, { before: false, after: true }],
    // 强制 if while function 后面的 { 必须与 if 在同一行
    'brace-style': [2, '1tbs', { allowSingleLine: true }],
    // 使用 [] 方括号取值时， [ 后面和 ] 前面不能加空格
    'computed-property-spacing': [2, 'never'],
    // 对象字面量中冒号的前后空格
    'key-spacing': [2, {
      'beforeColon': false,
      'afterColon': true
    }],
    // 缩进风格
    'indent': [2, 2, {
      'SwitchCase': 1
    }],
    // 不以新行开始的块{前面要不要有空格
    'space-before-blocks': [2, 'always'],
    // 函数定义时括号前面要不要有空格
    'space-before-function-paren': [2, 'never'],
    //小括号里面要不要有空格
    'space-in-parens': [2, 'never'],
    //中缀操作符周围要不要有空格
    'space-infix-ops': 2,
    //一元运算符的前/后要不要加空格
    'space-unary-ops': [2, {
      'words': true,
      'nonwords': false
    }],
    // 分号前后空格
    'semi-spacing': [2, {
      'before': false,
      'after': true
    }],
    // 强制 if else while for do 后面的代码块使用 {} 包裹
    curly: [2, 'all'],
    // 强制 switch 语句必须有 default 选项
    'default-case': 2,
    // 强制 Object.key 中 . 与属性在同一行
    'dot-location': [2, 'property'],
    // 文件末尾强制换行
    'eol-last': 2,
    // 使用 === 替代 ==
    eqeqeq: [2, 'allow-null'],
    // 禁止使用数组构造器
    'no-array-constructor': 2,
    // 禁止在条件表达式中使用赋值语句
    'no-cond-assign': 2,
    // 禁止修改 const 声明的变量
    'no-const-assign': 2,
    // 禁止在条件中使用常量表达式
    'no-constant-condition': 2,
    // 对象字面量不允许重复
    'no-dupe-keys': 2,
    // 块语句中的内容不能为空
    'no-empty': 2,
    // 禁止非必要的括号
    'no-extra-parens': 0,
    // 禁止多余的空格
    'no-multi-spaces': 2,
    // 空行不超过一行
    'no-multiple-empty-lines': [2, { max: 1 }],
    // 函数调用时，函数名与 () 之间不能有空格
    'no-spaced-func': 2,
    // 禁止稀疏数组
    'no-sparse-arrays': 2,
    // 行尾不能有空格
    'no-trailing-spaces': 2,
    // 禁止不必要的嵌套
    'no-unneeded-ternary': 2,
    // 不能有无法执行的代码
    'no-unreachable': 2,
    // 禁止无用的表达式
    'no-unused-expressions': 2,
    // 不能有声明后未使用的变量
    'no-unused-vars': [1, { vars: 'all', args: 'after-used' }],
    // 未定义前不能使用
    'no-use-before-define': 0,
    // 禁用var
    'no-var': 2,
    // 箭头函数 => 前后必须有空格
    'arrow-spacing': 2,
    // 箭头函数参数必须使用括号包裹
    'arrow-parens': 2,
    //大括号内是否允许不必要的空格
    'object-curly-spacing': [2, 'always', {
      objectsInObjects: false
    }],
    // 取消 eslint-plugin-vue 对组件名的校验
    'vue/multi-word-component-names': 0,
    // template 必须只有一个根节点
    // 'vue/no-multiple-template-root': 2,
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'never',
          normal: 'never',
          component: 'always'
        },
        svg: 'always',
        math: 'always'
      }
    ],
    'vue/prefer-import-from-vue': 0,
    'no-loss-of-precision': 'off',
    '@typescript-eslint/no-loss-of-precision': 'warn',
    '@typescript-eslint/no-explicit-any': 0
  }
};
