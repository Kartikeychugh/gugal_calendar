import { useSelector } from "../redux";

export const useNotification = () => {
  const { message } = useSelector((state) => state.notification);
  return message;
};
