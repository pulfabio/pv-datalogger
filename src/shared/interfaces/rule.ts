export interface Rule {
  ruleId: string;
  contactId: string;
  setOn_contactId: string;
  setOn_ruleFactorId: string;
  //setOn_ruleFactor: string;
  setOff_ruleFactorId: string;
  //setOff_ruleFactor: string;
  //On Rules
  //setOn_ruleFactorId == 1
  setOn_time_sign?: string;
  setOn_time?: string;
  setOn_cadenza?: string;
  setOn_cadenza_lun?: object; // checkbox
  setOn_cadenza_mar?: object; // checkbox
  setOn_cadenza_mer?: object; // checkbox
  setOn_cadenza_gio?: object; // checkbox
  setOn_cadenza_ven?: object; // checkbox
  setOn_cadenza_sab?: object; // checkbox
  setOn_cadenza_dom?: object; // checkbox
  setOn_time_green?: object; // checkbox
  //setOn_ruleFactorId == 2
  setOn_pvprod_sign?: string;
  setOn_pvprod?: string;
  setOn_pvprod_ist?: string;
  setOn_pvprod_delay?: string;
  setOn_pvprod_timer?: string;
  setOn_pvprod_green?: object; // checkbox
  //setOn_ruleFactorId == 3
  setOn_batteryperc_sign?: string;
  setOn_batteryperc?: string;
  setOn_batteryperc_green?: object; // checkbox
  //setOn_ruleFactorId == 3
  setOn_batteryvolt_sign?: string;
  setOn_batteryvolt?: string;
  setOn_batteryvolt_green?: string;
  //Off Rules
  //setOff_ruleFactorId == 1
  setOff_time_sign?: string;
  setOff_time?: string;
  setOff_cadenza?: string;
  setOff_cadenza_lun?: object; // checkbox
  setOff_cadenza_mar?: object; // checkbox
  setOff_cadenza_mer?: object; // checkbox
  setOff_cadenza_gio?: object; // checkbox
  setOff_cadenza_ven?: object; // checkbox
  setOff_cadenza_sab?: object; // checkbox
  setOff_cadenza_dom?: object; // checkbox
  setOff_time_green?: object; // checkbox
  //setOff_ruleFactorId == 2
  setOff_pvprod_sign?: string;
  setOff_pvprod?: string;
  setOff_pvprod_ist?: string;
  setOff_pvprod_delay?: string;
  setOff_pvprod_timer?: string;
  setOff_pvprod_green?: object; // checkbox
  //setOff_ruleFactorId == 3
  setOff_batteryperc_sign?: string;
  setOff_batteryperc?: string;
  setOff_batteryperc_green?: object; // checkbox
  //setOff_ruleFactorId == 3
  setOff_batteryvolt_sign?: string;
  setOff_batteryvolt?: string;
  setOff_batteryvolt_green?: string;
}