import { fetchTickets } from "../slices//ticketsSlice";
import { AppDispatch } from "../slices/index";

export const fetchAllTickets = async (
  currentSearchId: string,
  dispatch: AppDispatch,
  loadingStatus: string
) => {
  if (loadingStatus === "loading") return;

  try {
    const result = await dispatch(fetchTickets(currentSearchId)).unwrap();
    if (!result.stop) {
      await fetchAllTickets(currentSearchId, dispatch, loadingStatus);
    }
  } catch (err) {
    console.error("tickets request error", err);
    await fetchAllTickets(currentSearchId, dispatch, loadingStatus);
  }
};
