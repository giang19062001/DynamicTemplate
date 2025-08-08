const funcService = {
   loadMore: (arrayData: any[], offset: number, limit: number) => {
      const start = offset * limit;
      const end = start + limit;
      const paginatedItems = arrayData.slice(start, end);

      return {
         total: arrayData.length,
         data: paginatedItems,
      };
   },

   toCamelCase: <T extends Record<string, any>>(obj: T): any => {
      function toCamelCaseKey(key: string): string {
         return key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
      }
      if (Array.isArray(obj)) {
         return obj.map((v) => funcService.toCamelCase(v));
      } else if (obj !== null && typeof obj === "object") {
         return Object.keys(obj).reduce((acc: any, key) => {
            acc[toCamelCaseKey(key)] = funcService.toCamelCase(obj[key]);
            return acc;
         }, {});
      }
      return obj;
   },

   generateLogBase: (modelName: string, functionName: string, object: any) => {
      let logbase = `${modelName}.${functionName}: `;
      if (object) {
         for (const property in object) {
            logbase += `${property}(${object[property]}), `;
         }
      }
      return logbase;
   },
};
export default funcService;
