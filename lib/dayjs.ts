import dayjs from "dayjs";
import ptBR from "dayjs/locale/pt-br";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.locale(ptBR);
dayjs.extend(localizedFormat);

export { dayjs };
