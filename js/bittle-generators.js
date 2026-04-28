/* ==========================================================
   bittle-generators.js — Bittle 積木 → JavaScript code 生成器
   生成的 code 是 async function body，由 main.js 包成 async 執行

   v0.2 重構：所有動作積木的 generator 由 BITTLE_SKILLS array loop 自動生成。
   ========================================================== */

// ============== 進入點 ==============

Blockly.JavaScript['bittle_start'] = function (block) {
  return "BittleApp.log('🟢 程式開始', 'success');\n";
};

Blockly.JavaScript['bittle_reset'] = function (block) {
  return "await BittleApp.runtime.send('kbalance');\n";
};

// ============== Servo 控制 ==============

Blockly.JavaScript['bittle_servo_move'] = function (block) {
  const index = block.getFieldValue('SERVO_INDEX');
  const angle = block.getFieldValue('ANGLE');
  return `await BittleApp.runtime.send('m ${index} ${angle}');\n`;
};

Blockly.JavaScript['bittle_servo_move_pair'] = function (block) {
  const i1 = block.getFieldValue('SERVO_INDEX_1');
  const a1 = block.getFieldValue('ANGLE_1');
  const i2 = block.getFieldValue('SERVO_INDEX_2');
  const a2 = block.getFieldValue('ANGLE_2');
  return `await BittleApp.runtime.send('i ${i1} ${a1} ${i2} ${a2}');\n`;
};

// ============== 聲音 / 時間 ==============

Blockly.JavaScript['bittle_beep'] = function (block) {
  const pitch = block.getFieldValue('PITCH');
  const dur = block.getFieldValue('DURATION');
  return `await BittleApp.runtime.send('b ${pitch} ${dur}');\n`;
};

Blockly.JavaScript['bittle_wait'] = function (block) {
  const seconds = block.getFieldValue('SECONDS');
  return `await BittleApp.runtime.wait(${seconds});\n`;
};

// ============== 動作積木 generators（loop 自動生成 50+ 個）==============

BittleApp.BITTLE_SKILLS.forEach((skill) => {
  Blockly.JavaScript['bittle_' + skill.id] = function (block) {
    return `await BittleApp.runtime.send('${skill.ascii}');\n`;
  };
});
