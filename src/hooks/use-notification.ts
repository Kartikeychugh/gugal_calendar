import { useSelector } from "../redux/hooks/use-selector";

export const useNotification = () => {
  const { message } = useSelector((state) => state.notification);
  return message;
};
