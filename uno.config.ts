import { defineConfig } from 'unocss';
const sideBar = '200px';
const sideCollapsed = '46px';
const header = '60px';
export default defineConfig({
  theme: {
    colors: {
      themeColor: '#009500', // 主题颜色
      contentBg: '#101e27', // 内容背景色
      navBg: '#19262e', // 左边菜单和顶部背景色
      logoBg: '#1f2d36', // logo背景色
      cardBg: '#1f2f39', // 卡片背景色
      textDefault: '#fff', // 字体默认颜色
      textInfo: '#87a3b0', // 详情字体颜色
      bColor: '#26333d', // border颜色
      bColor2: '#184e37', // border2颜色
      primary: 'var(--primary-color)',
      'primary-hover': 'var(--primary-color-hover)',
      'primary-pressed': 'var(--primary-color-pressed)',
      'primary-active': 'var(--primary-color-active)'
    },
    width: {
      content: `calc(100% - ${sideBar})`,
      'content--collapsed': `calc(100% - ${sideCollapsed})`, // 内容宽度
      sidebar: sideBar, // 距离 sidebar 有多宽(header, content)
      'sidebar--collapsed': sideCollapsed // 折叠状态下的 sidebar 宽度
    },
    spacing: {
      mini: '8px',
      small: '12px',
      normal: '16px',
      medium: '20px',
      large: '24px',
      'screen-item': '36px', // 大屏监控边距
      sidebar: sideBar, // 距离 sidebar 有多宽(header, content)
      'sidebar--collapsed': sideCollapsed, // 折叠状态下的 sidebar 宽度
      header: header, // 内容区域距顶部的高度 header
      content: `calc(100% - ${sideBar})`, // 内容宽度
      'content--collapsed': `calc(100% - ${sideCollapsed})` // 内容宽度
    },
    fontSize: {
      mini: ['12px', '18px'],
      small: ['14px', '20px'],
      normal: ['16px', '24px'],
      medium: ['20px', '28px'],
      large: ['24px', '32px']
    },
    borderRadius: {
      mini: '4px',
      small: '8px',
      normal: '10px',
      medium: '16px',
      large: '24px'
    }
  },
  shortcuts: {
  }
});
