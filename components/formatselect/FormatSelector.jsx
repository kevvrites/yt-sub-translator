import React, { useState } from 'react';
import styles from './styles.module.css'
const FormatSelector = ({defaultFormat, labelText, onSelectFormat}) => {
  const [format, setFormat] = useState(defaultFormat);

  const handleFormatChange = (event) => {
    setFormat(event.target.value);
    onSelectFormat(event.target.value);
    if (event.target.value === "srt") {
      console.log("SRT SRT SRT SRT")
    }
  };

  return (
    <div className={styles.container}>
    <label className={styles.label} htmlFor="formatSelect">{labelText}</label>
      <select id="formatSelect" className={styles.select} value={format} aria-label="Select Format" onChange={handleFormatChange}>
        <option value="txt">Text (.txt)</option>
        <option value="srt">SubRip (.srt)</option>
        <option value="sbv">SubViewer (.sbv)</option>
      </select>
    </div>
  );
};

export default FormatSelector;