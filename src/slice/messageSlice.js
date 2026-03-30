import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: [],
  reducers: {
    createMessage(state, action) {
      state.push({
        id: action.payload.id,
        type: action.payload.success ? "success" : "danger", // 用來判斷 bootstrap 的顏色
        title: action.payload.success ? "成功" : "失敗",
        text: action.payload.message,
      });
    },
    removeMessage(state, action) {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

// createAsyncThunk: 用於處理非同步操作，會自動處理 loading、fulfilled、rejected 狀態
// createAsyncThunk 會回傳一個 thunk action creator，是一個可以被 dispatch 的函式
export const createAsyncMessage = createAsyncThunk(
  // action type。命名規則：'Slice名稱/動作描述'
  'message/createAsyncMessage',
  // payload creator: async function 會回傳一個 Promise，Promise 的 resolve 值會變成 fulfilled 動作的 payload，
  // 並送到 extraReducers 中的 fulfilled case 處理。
  // 不過在這裡我們沒有指定回傳值，因為我們只想要觸發 action，讓 component 顯示訊息。
  // 因此它預設會回傳 undefined，意味著它創造出的 fulfilled action 會長這樣：
  // { type: 'message/createAsyncMessage/fulfilled', payload: undefined }
  async (payload, { dispatch, requestId }) => {
    // { dispatch, requestId } 是從一個叫做 thunkAPI 的大物件中解構出來的。
    // 這個物件是由 Redux Toolkit 自動注入的，提供了操作 Store 的各種權限。
    // dispatch: 用於分發 action
    // requestId: 用於識別每個非同步操作的唯一 ID
    dispatch(messageSlice.actions.createMessage({
      ...payload,
      id: requestId,
    }));

    setTimeout(() => {
      dispatch(messageSlice.actions.removeMessage(requestId));
    }, 2000);
  }
);

export const { createMessage, removeMessage } = messageSlice.actions;
export default messageSlice.reducer;
