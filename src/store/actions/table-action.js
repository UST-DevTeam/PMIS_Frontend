
import { CLEAR_RECORDS } from "../reducers/table-reducer"
import store from "../index"
import Api from "../../utils/api"



export const tableAction={
    getTable: (url,action  , show = 1) => async (dispatch, _) => {
    
        // if (shouldReset) {
        //     dispatch(CLEAR_RECORDS([]))
        // }
        const res = await Api.get({ url})
        if (res.status !== 200) return
        console.log("lewkpugvfycdsah vjbnkjldefhuoryigtuvdkscj ==",res.data?.data)
        console.log("lewkpugvfycdsah vjbnkjldefhuoryigtuvdkscj ==",res.data?.data.length)

        store.dispatch(action(res.data?.data || []))
    },

    deleteUser :(url, id, action, show = 1, cb = () => {}) =>
  async (dispatch) => {
    try {
      // Delete the user
      let res = await Api.delete({ url: `${url}/${id}` });
      if (res.status !== 200) {
        console.error("Failed to delete user:", res);
        return;
      }

      // Fetch updated data
      res = await Api.get({ url });
      if (res.status !== 200) {
        console.error("Failed to fetch updated data:", res);
        return;
      }

      // Dispatch updated data to the store
      dispatch(action(res.data?.data || []));

      // Optional callback for additional actions
      cb();

      // Optional UI feedback
      if (show) {
        console.log("User deleted successfully");
      }
    } catch (error) {
      console.error("An error occurred while deleting the user:", error);
    }
}
}