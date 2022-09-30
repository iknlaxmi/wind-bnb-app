import './App.css';
import { useState } from 'react';
import Select, { components } from 'react-select';
import NavCard from './components/NavCard';
import data from './data/stays.json';
import logo from './logo.png';

let filtered = [];
const { Option } = components;
const IconOption = (props) => (
  <Option {...props}>
    <img
      src={require('./' + props.data.icon)}
      style={{ width: 15 }}
      alt={props.data.label}
    />
    {props.data.label}
  </Option>
);

function App() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [displaySearch, setDisplaySearch] = useState(false);
  const [renderFlag, setRenderFlag] = useState(false);

  //For Cities
  const searchList = data.map(({ city, country }) => {
    return {
      value: city + ', ' + country,
      label: city + ', ' + country,
      icon: 'loc-icon.svg',
    };
  });

  const key = 'value';
  const arrayUniqueByKey = [
    ...new Map(searchList.map((item) => [item[key], item])).values(),
  ];
  //For Guests
  const guestsList = [...new Array(11)].map((each, index) => ({
    label: index,
    value: index,
  }));
  const customStylesCity = {
    // control represent the select component
    control: (provided) => ({
      ...provided,
      width: '185px',
    }),
  };
  const customStylesGuest = {
    // control represent the select component
    control: (provided) => ({
      ...provided,
      width: '185px',
    }),
  };

  function getData() {
    filtered = data.filter((item) => {
      return (
        item.city === selectedCity.value.split(',')[0] &&
        selectedGuest.value <= item.maxGuests
      );
    });
    setDisplaySearch(true);
    setRenderFlag(!renderFlag);
    console.log(filtered);
  }

  return (
    <div>
      <img src={logo} className="app_logo" alt="logo" />
      <div className="select-container">
        <div className="select-flex-item item3">
          <button type="submit" className="btn" onClick={getData}>
            <i class="fa fa-search icon-style"></i>
          </button>
        </div>
        <div className="select-flex-item">
          <Select
            value={selectedGuest}
            // defaultValue="Add Guests"
            placeholder="Add Guests"
            onChange={setSelectedGuest}
            options={guestsList}
            openMenuOnClick={true}
            styles={customStylesGuest}
            components={{
              DropdownIndicator: () => null,
              IndicatorSeparator: () => null,
            }}
          />
        </div>
        <div className="select-flex-item item1">
          <Select
            value={selectedCity}
            // defaultValue="Add City"
            placeholder="Add Location"
            onChange={setSelectedCity}
            options={arrayUniqueByKey}
            openMenuOnClick={true}
            styles={customStylesCity}
            components={{
              Option: IconOption,
              DropdownIndicator: () => null,
              IndicatorSeparator: () => null,
            }}
          />
        </div>
      </div>
      <div className="stays-container">
        {displaySearch === false ? (
          <div className="stay-item">{data.length} Stays</div>
        ) : (
          <div className="stay-item">{filtered.length} Stays</div>
        )}
      </div>
      <div className="container">
        {displaySearch === false
          ? data.map((item) => (
              <NavCard
                image={item.photo}
                title={item.title}
                type={item.type}
                beds={item.beds}
                rating={item.rating}
                superHost={item.superHost}
              />
            ))
          : filtered.map((item) => (
              <NavCard
                image={item.photo}
                title={item.title}
                type={item.type}
                beds={item.beds}
                rating={item.rating}
                superHost={item.superHost}
              />
            ))}

        {/* <h3>Hello</h3> */}
      </div>
      <footer className="footer">
        Created by Nagalakshmi - devChallenges.io
      </footer>
    </div>
  );
}

export default App;
