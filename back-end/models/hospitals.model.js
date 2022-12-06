const mongoose = require("mongoose");
const hospitalSchema = new mongoose.Schema({
  id: { type: Number },
  users:{ type: Array },
  name: { type: String },
  address: {
    country_code: { type: String },
    post_code: { type: String },
    city: { type: String },
    address: { type: String },
  },
  emails: [{ type: String }],
  taxcode: { type: String },
  iban: { type: String },
  swift: { type: String },
  account_number: { type: String },
  phone: { type: String },
  general_ledger_number: { type: String },
  tax_type: { type: String },
  custom_billing_settings: {
    payment_method: { type: String },
    document_form: { type: String },
    due_days: { type: Number, default: null },
    document_currency: { type: String },
    template_language_code: { type: String },
    discount: { type: String, default: null },
  },
  group_member_tax_number: { type: String },
  giro_settings: {
    giro_default_settings: { type: Boolean, default: true },
    giro_payment_request_enabled: { type: Boolean, default: false },
    giro_different_amount_allowed: { type: Boolean, default: false },
  },
  partner_shipping: {
    match: { type: Boolean, default: false },
    name: { type: String },
    mode: { type: String },
    address: {
      country_code: { type: String },
      post_code: { type: String },
      city: { type: String },
      address: { type: String },
    },
  },
  internal_comment: { type: String },
  partner_show_type: { type: String },
});

module.exports = mongoose.model("hospital", hospitalSchema);

