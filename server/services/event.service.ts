import { BaseResponse, makeResponse } from '../contracts/baseResponse';
import { HttpStatusCode } from '../constants/constants';

/**
 * @class EventServices
 */
export default class EventServices implements Required<EventServices> {
  /**
   * @author Akinlua
   * @method addEventServiceAsync
   * @desc Feature will add new event
   * @returns {object} BaseResponse
   */
  addEventServiceAsync = async (): Promise<BaseResponse<null>> => {
    try {
      throw new Error('Method not implemented yet');
    } catch (error) {
      return makeResponse(null, HttpStatusCode.INTERNAL_ERROR, error.message);
    }
  };
}
