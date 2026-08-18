const PAD_COUNTS = {
  ITEM: 10,
  LOT: 15,
  QTY: 31,
};

const PAD_CHARACTER = "@";

const appendPadding = (value, count) => {
  const str = value !== undefined && value !== null ? value.toString().trim() : "";
  return str + PAD_CHARACTER.repeat(count);
};

export const generateQRString = (item = "", lot = "", qty = "") => {
  return (
    appendPadding(item, PAD_COUNTS.ITEM) +
    appendPadding(lot, PAD_COUNTS.LOT) +
    appendPadding(qty, PAD_COUNTS.QTY)
  );
};