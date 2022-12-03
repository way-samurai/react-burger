export const formatDate = (date: Date): string => {
  const createdAt = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diffTime = Math.ceil(
    (today.getTime() - createdAt.getTime()) / (60 * 60 * 24 * 1000)
  );
  const hours =
    createdAt.getHours() > 9
      ? createdAt.getHours()
      : `0${createdAt.getHours()}`;
  const min =
    createdAt.getMinutes() > 9
      ? createdAt.getMinutes()
      : `0${createdAt.getMinutes()}`;
  const getDays = (days: number) =>
    days === 0
      ? "Сегодня"
      : days === 1
      ? "Вчера"
      : days > 1
      ? `${days} дня(-ей) назад`
      : "Ошибка";
  return `${getDays(diffTime)}, ${hours}:${min} i-GMT+${
    (createdAt.getTimezoneOffset() * -1) / 60
  }`;
};
