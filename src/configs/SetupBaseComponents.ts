import { App } from 'vue';

// type requireType = __WebpackModuleApi.RequireContext;

function convertNameFile(nameFile: string, typeFile: string): string {
  const nameFileReplace = nameFile.replace(typeFile, '').replace('./', '');

  const newName: string = nameFileReplace[0].toLowerCase()
    + nameFileReplace
      .slice(1, nameFileReplace.length)
      .replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);

  return newName;
}

export default (app: App): void => {
  // const components: requireType = require.context(
  //   '../components/Base',
  //   false,
  //   /.(vue)$/,
  // );

  // components.keys().forEach((fileName:any) => {
  //   const componentName: string = convertNameFile(fileName, '.vue');
  //   const componentConfig = components(fileName);

  //   app.component(componentName, componentConfig.default);
  // });
};
