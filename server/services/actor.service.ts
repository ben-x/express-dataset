import { BaseResponse, makeResponse } from '../contracts/baseResponse';
import { HttpStatusCode } from '../constants/constants';

/**
 * @class ActorServices
 */
export default class ActorServices implements Required<ActorServices> {
  /**
   * @author Akinlua
   * @method addActorServiceAsync
   * @desc Feature will add new actor
   * @returns {object} BaseResponse
   */
  addActorServiceAsync = async (): Promise<BaseResponse<null>> => {
    try {
      throw new Error('Method not implemented yet');
    } catch (error) {
      return makeResponse(null, HttpStatusCode.INTERNAL_ERROR, error.message);
    }
  };
}
