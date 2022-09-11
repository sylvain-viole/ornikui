export class DynamicDatas {
  /**
   * Static class gathering all dynamic datas (data persistence)
   * @example
   * // file1
   * const dynamicDatas = new DynamicDatas()
   * dynamicDatas.myValue = "YOUPI"
   *
   * //file2
   * const dynamicDatas = new DynamicDatas()
   * console.log(dynamicDatas.myValue) // returns "YOUPI"
   *
   * @class
   * @Singleton
   *
   */
  constructor() {
    if (!DynamicDatas.instance) {
      DynamicDatas.instance = this;
    }
    return DynamicDatas.instance;
  }
}
