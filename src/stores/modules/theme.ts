import { GlobalThemeOverrides } from 'naive-ui';
import { defineStore } from 'pinia';

interface IThemeStore {
  themeOverrides: GlobalThemeOverrides;
}

const textColor1 = '#fff';
const textColor2 = '#fff';
const primaryColor = '#FFB8B8';
const bgColor1 = '#fff'; // 输入框, 日期等背景色
const bgColor2 = '#101e27'; // 弹框背景色
const borderColor1 = '#FFB8B8'; // 弹框背景色

export const useThemeStore = defineStore('theme', () => {
  const store: IThemeStore = reactive({
    themeOverrides: {
      common: {
        hoverColor: '#1f2d36',
        primaryColor,
        placeholderColor: '#43616F',
        // placeholderColorDisabled: '#33463f',
        textColor1, // 字体默认颜色
        textColor2, // 内容默认颜色
        borderColor: '#fff'
      },
      Menu: {
        itemHeight: '50px',
        itemTextColor: textColor1,
        itemIconColor: textColor1,
        arrowColor: textColor1,
        itemIconColorCollapsed: textColor1,
        itemColorActiveCollapsed: textColor1,
        itemIconColorHover: primaryColor,
        itemTextColorHover: primaryColor,
        arrowColorHover: primaryColor
      },
      Switch: {
        railColor: '#f0f0f0'
      },
      DataTable: {
        tdColor: bgColor1,
        tdColorModal: '#202e37',
        tdColorStriped: '#19262e',
        tdTextColor: textColor1,
        thColor: '#2c404d',
        thTextColor: textColor2,
        borderColor: 'transparent',
        borderColorModal: 'transparent',
        tdColorHover: '#1c2b34',
        tdColorHoverModal: '#1c2b34',
        thColorModal: '#2c404d',
        tdColorStripedModal: '#19262e'
      },
      Pagination: {
        itemColorDisabled: 'transparent'
      },
      Form: {
        labelTextColor: textColor2
      },
      Radio: {
        buttonBorderColor: primaryColor,
        buttonTextColorActive: textColor1,
        buttonColorActive: primaryColor,
        buttonTextColor: primaryColor
      },
      Input: {
        color: bgColor1,
        colorFocus: 'transparent',
        textColor: primaryColor,
        border: `1px solid ${borderColor1}`,
        colorFocusError: bgColor1,
        borderFocus: '#43616F',
        borderHover: '#43616F',
        colorDisabled: '#61737e',
        textColorDisabled: '#33463f'
      },
      Dialog: {
        color: bgColor1,
        textColor: textColor1,
        titleTextColor: textColor1,
        padding: '16px'
      },
      DatePicker: {
        itemTextColor: textColor2,
        panelColor: bgColor1,
        itemTextColorDisabled: '#33463f',
        arrowColor: textColor2,
        panelActionDividerColor: 'transparent',
        calendarDaysDividerColor: textColor2,
        calendarDividerColor: 'transparent'
      },
      TimePicker: {
        panelColor: bgColor1
      },
      Divider: {
        color: '#26333d'
      },
      Popover: {
        color: bgColor1,
        padding: '20px'
      },
      Upload: {
        draggerColor: bgColor1,
        draggerBorder: `1px solid ${borderColor1}`
      },
      Cascader: {
        menuColor: bgColor1,
        menuDividerColor: '#26333d'
      },
      Tree: {
        nodeTextColor: '#ffffff'
      }
    }
  });

  return {
    ...toRefs(store)
  };
});
