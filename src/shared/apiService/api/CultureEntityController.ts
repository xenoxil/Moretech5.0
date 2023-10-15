import RestClient from '../restClient';

class CultureEntityController {
  static getCultures() {
    return RestClient.getAxios(`/cultures`);
  }
  static postCultures(data: any) {
    return RestClient.postAxios(`/cultures`, data);
  }

  static getCulture(id: number) {
    return RestClient.getAxios(`/cultures/${id}`);
  }
  static deleteCulture(id: number) {
    return RestClient.deleteAxios(`/cultures/${id}`);
  }
  static patchCulture(id: number, data: any) {
    return RestClient.patchAxios(`/cultures/${id}`, data);
  }
}
export default CultureEntityController;
