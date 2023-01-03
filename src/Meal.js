import React, { useEffect, useState } from "react";

function Meal() {
  const [meal, setMeal] = useState("pizza");
  const [res, setRes] = useState([]);

  const getMeal = async () => {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/${process.env.REACT_APP_API_KEY}/search.php?s=${meal}`
      );
      const data = await response.json();
      setRes(data.meals);
    } catch (e) {
      console.log(e);
    }
  };

  const checkVal = (e) => {
    setMeal(e.target.value);
  };

  const displayMeals = res.map((item, index) => (
    <div style={{ margin: "1rem" }} key={index}>
      <img
        src={item.strMealThumb}
        alt="food thumbnail"
        style={{ width: "200px" }}
      />
      <h3>{item.strMeal}</h3>
    </div>
  ));

  useEffect(() => {
    getMeal();
  }, [meal]);
  return (
    <>
      <form>
        <label htmlFor="meal">Enter Meal: </label>
        <input
          type="text"
          name="meal"
          onChange={checkVal}
          placeholder="Pizza"
        />
      </form>
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {displayMeals}
      </div>
    </>
  );
}

export default Meal;
