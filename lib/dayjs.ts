import dayjs from "dayjs";
import ptBR from "dayjs/locale/pt-br";
import localizedFormat from "dayjs/plugin/localizedFormat";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.locale(ptBR);
dayjs.extend(localizedFormat);
dayjs.extend(isSameOrBefore);

export { dayjs };
