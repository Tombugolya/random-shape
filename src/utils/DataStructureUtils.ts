class DataStructureUtils {
  static chunk(inputArray: Array<any>, size: number): Array<any> {
    return inputArray.reduce((array, item, index) => {
      return index % size === 0
        ? [...array, [item]]
        : [...array.slice(0, -1), [...array.slice(-1)[0], item]];
    }, []);
  }
}

export default DataStructureUtils;
