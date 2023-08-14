import React, { useState } from 'react';
import styles from './styles.module.css'

const LanguageSelector = ({defaultLanguage, labelText, onSelectLanguage}) => {
  const [language, setLanguage] = useState(defaultLanguage);

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
    onSelectLanguage(event.target.value)
  };

  return (
    <div className={styles.container}>
    <label className={styles.label} htmlFor="languageSelect">{labelText}</label>
      <select id="languageSelect" className={styles.select} value={language} aria-label="Select Language" onChange={handleLanguageChange}>
        <option value="Afrikaans">Afrikaans</option>
        <option value="Albanian">Albanian</option>
        <option value="Amharic">Amharic</option>
        <option value="Arabic">Arabic</option>
        <option value="Armenian">Armenian</option>
        <option value="Assamese">Assamese</option>
        <option value="Aymara">Aymara</option>
        <option value="Azerbaijani">Azerbaijani</option>
        <option value="Bambara">Bambara</option>
        <option value="Basque">Basque</option>
        <option value="Belarusian">Belarusian</option>
        <option value="Bengali">Bengali</option>
        <option value="Bhojpuri">Bhojpuri</option>
        <option value="Bosnian">Bosnian</option>
        <option value="Bulgarian">Bulgarian</option>
        <option value="Burmese">Burmese</option>
        <option value="Catalan">Catalan</option>
        <option value="Cebuano">Cebuano</option>
        <option value="Chewa">Chewa (Chichewa)</option>
        <option value="Chinese (Simplified)">Chinese (Simplified)</option>
        <option value="Chinese (Traditional)">Chinese (Traditional)</option>
        <option value="Corsican">Corsican</option>
        <option value="Croatian">Croatian</option>
        <option value="Czech">Czech</option>
        <option value="Danish">Danish</option>
        <option value="Dogri">Dogri</option>
        <option value="Dutch">Dutch</option>
        <option value="English">English</option>
        <option value="Esperanto">Esperanto</option>
        <option value="Estonian">Estonian</option>
        <option value="Ewe">Ewe</option>
        <option value="Filipino (Tagalog)">Filipino (Tagalog)</option>
        <option value="Finnish">Finnish</option>
        <option value="French">French</option>
        <option value="Galician">Galician</option>
        <option value="Georgian">Georgian</option>
        <option value="German">German</option>
        <option value="Greek">Greek</option>
        <option value="Guarani">Guarani</option>
        <option value="Gujarati">Gujarati</option>
        <option value="Haitian Creole">Haitian Creole</option>
        <option value="Hausa">Hausa</option>
        <option value="Hawaiian">Hawaiian</option>
        <option value="Hebrew">Hebrew</option>
        <option value="Hindi">Hindi</option>
        <option value="Hmong">Hmong</option>
        <option value="Hungarian">Hungarian</option>
        <option value="Icelandic">Icelandic</option>
        <option value="Igbo">Igbo</option>
        <option value="Ilocano">Ilocano</option>
        <option value="Indonesian">Indonesian</option>
        <option value="Irish">Irish</option>
        <option value="Italian">Italian</option>
        <option value="Japanese">Japanese</option>
        <option value="Javanese">Javanese</option>
        <option value="Kannada">Kannada</option>
        <option value="Kazakh">Kazakh</option>
        <option value="Khmer">Khmer</option>
        <option value="Kinyarwanda">Kinyarwanda</option>
        <option value="Konkani">Konkani</option>
        <option value="Korean">Korean</option>
        <option value="Krio">Krio</option>
        <option value="Kurdish (Kurmanji)">Kurdish (Kurmanji)</option>
        <option value="Kurdish (Sorani)">Kurdish (Sorani)</option>
        <option value="Kyrgyz">Kyrgyz</option>
        <option value="Lao">Lao</option>
        <option value="Latin">Latin</option>
        <option value="Latvian">Latvian</option>
        <option value="Lingala">Lingala</option>
        <option value="Lithuanian">Lithuanian</option>
        <option value="Luganda">Luganda</option>
        <option value="Luxembourgish">Luxembourgish</option>
        <option value="Macedonian">Macedonian</option>
        <option value="Maithili">Maithili</option>
        <option value="Malagasy">Malagasy</option>
        <option value="Malay">Malay</option>
        <option value="Malayalam">Malayalam</option>
        <option value="Maldivian">Maldivian (Dhivehi)</option>
        <option value="Maltese">Maltese</option>
        <option value="Māori">Māori (Maori)</option>
        <option value="Marathi">Marathi</option>
        <option value="Meitei">Meitei (Meiteilon or Manipuri)</option>
        <option value="Mizo">Mizo</option>
        <option value="Mongolian">Mongolian</option>
        <option value="Nepali">Nepali</option>
        <option value="Northern Sotho">Northern Sotho (Sepedi)</option>
        <option value="Norwegian (Bokmål)">Norwegian (Bokmål)</option>
        <option value="Odia">Odia (Oriya)</option>
        <option value="Oromo">Oromo</option>
        <option value="Pashto">Pashto</option>
        <option value="Persian">Persian</option>
        <option value="Polish">Polish</option>
        <option value="Portuguese">Portuguese</option>
        <option value="Punjabi">Punjabi (Gurmukhi)</option>
        <option value="Romanian">Romanian</option>
        <option value="Russian">Russian</option>
        <option value="Samoan">Samoan</option>
        <option value="Sanskrit">Sanskrit</option>
        <option value="Scottish Gaelic">Scottish Gaelic (Scots Gaelic)</option>
        <option value="Serbian">Serbian</option>
        <option value="Shona">Shona</option>
        <option value="Sindhi">Sindhi</option>
        <option value="Sinhala">Sinhala</option>
        <option value="Slovak">Slovak</option>
        <option value="Slovene">Slovene (Slovenian)</option>
        <option value="Somali">Somali</option>
        <option value="Sotho">Sotho (Sesotho)</option>
        <option value="Southern Quechua">Southern Quechua (Quechua)</option>
        <option value="Spanish">Spanish</option>
        <option value="Sundanese">Sundanese</option>
        <option value="Swahili">Swahili</option>
        <option value="Swedish">Swedish</option>
        <option value="Tajik">Tajik</option>
        <option value="Tamil">Tamil</option>
        <option value="Tatar">Tatar</option>
        <option value="Telugu">Telugu</option>
        <option value="Thai">Thai</option>
        <option value="Tigrinya">Tigrinya</option>
        <option value="Tsonga">Tsonga</option>
        <option value="Turkish">Turkish</option>
        <option value="Turkmen">Turkmen</option>
        <option value="Twi">Twi</option>
        <option value="Ukrainian">Ukrainian</option>
        <option value="Urdu">Urdu</option>
        <option value="Uyghur">Uyghur</option>
        <option value="Uzbek">Uzbek</option>
        <option value="Vietnamese">Vietnamese</option>
        <option value="Welsh">Welsh</option>
        <option value="West Frisian">West Frisian (Frisian)</option>
        <option value="Xhosa">Xhosa</option>
        <option value="Yiddish">Yiddish</option>
        <option value="Yoruba">Yoruba</option>
        <option value="Zulu">Zulu</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
