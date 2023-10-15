import AuthController from './api/AuthController';
import CultureEntityController from './api/CultureEntityController';

class ApiDiContainer {
  static CultureEntityController = CultureEntityController;
  static AuthController = AuthController;
}
export default ApiDiContainer;
