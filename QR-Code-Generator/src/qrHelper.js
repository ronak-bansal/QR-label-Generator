const FIELD_LENGTHS = {
  ITEM: 30,
  LOT: 20,
  QTY: 35,
};

const PAD_CHARACTER = "@";

const pad = (value, length) => {
  return value.toString().padEnd(length, PAD_CHARACTER);
};

export const generateQRString = (item, lot, qty) => {
  return (
    pad(item.trim(), FIELD_LENGTHS.ITEM) +
    pad(lot.trim(), FIELD_LENGTHS.LOT) +
    pad(qty.toString().trim(), FIELD_LENGTHS.QTY)
  );
};