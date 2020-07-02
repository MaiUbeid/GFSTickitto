import theme2 from './_theme2.scss';
import whiteLabel from './_whitelabel.scss';
/* 
  here we define all of the possible variables that can be used
  These vars all get also applied to antd so make sure that the name that these use matches the one in antd
  In scss you use them like var(--primary-color) as on load the appropriate value gets assigned to the css variable.
  This file needs to contain every variable that every other theme contains. This is because on build we need to pass
  all variables to "antd-theme-webpack-plugin" 
  - Any antd color variables used need to be added to variables.less make sure that the color value is unique, although they get overrridden


  When adding a new variable this is what needs to be done:
  - If its an antd COLOR VARIABLE:
    1. add the var to variables.less with a UNIQUE color, any color as it gets overridden
    2. add the variable in whitelabel theme
    3. add the variable to the exports folder

  - If its an antd non color variable:
    1. add the var to variables.less

  - If its a variable not used by antd:
    1. add the variable in whitelabel theme
    2. add the variable to the exports folder 
*/

const applyTheme = theme => {
  // updates the css variabless
  Object.keys(theme).forEach(key => {
    const root = document.documentElement;
    root.style.setProperty(`--${key}`, theme[key]);
  });

  const lessStylesObj = {};
  // creates the less styles Obj
  Object.keys(theme).forEach(key => {
    lessStylesObj[`@${key}`] = theme[key];
  });

  // override less variables
  window.less
    .modifyVars(lessStylesObj)
    .then(() => {
      /*
        find the antd color overrides and move it from the <body> to the <head> 
        right after the the full antd css but before our own custom css
      */
      const antdColorOverrides = document.getElementById('less:color');
      const fullAntdCss = document.querySelector(
        '[href*="antdcoloroverrides"]'
      );

      function insertAfter(referenceNode, newNode) {
        referenceNode.parentNode.insertBefore(
          newNode,
          referenceNode.nextSibling
        );
      }

      insertAfter(fullAntdCss, antdColorOverrides);
    })
    .catch(error => {
      console.error('Failed to update theme', error);
    });
};

export { applyTheme, whiteLabel, theme2 };
