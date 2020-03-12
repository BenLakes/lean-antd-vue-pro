import axios from "axios";
import { notification } from "ant-design-vue";

function request(options) {
  return axios(options)
    .then(res => {
      return res;
    })
    .catch(err => {
      const {
        response: { status, statusText }
      } = err;
      notification.error({
        // eslint-disable-next-line no-unused-vars
        message: h => (
          <div>
            请求错误<span style="color: red">{status}</span>:{options.url}
          </div>
        ),
        description: statusText
      });
      // 这样做的意义是避免在错误的时候也跑到  then的回调中去
      return Promise.reject(err);
    });
}
export default request;
