export const birthday = (birthday) => {
  return new Date(birthday).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};
