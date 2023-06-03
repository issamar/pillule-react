import React from "react";

const Stats = ({ sales }) => {
    const pils = sales?.map((obj) => obj.pils_name);
    console.log(pils);

    /*     var elementCounts = pils?.reduce(
        (count, item) => ((count[item] = count[item] + 1 || 1), count),
        {}
    );
    console.log(elementCounts); */
    let counter = {};
    pils?.forEach((val) => (counter[val] = (counter[val] || 0) + 1));
    console.log("counter :", counter);
    return (
        <div className="stat-div">
            <div>Nombre de Patient: {sales?.length}</div>

            {Object.keys(counter).map((key, index) => {
                return (
                    <div key={index}>
                        {key} : {counter[key]}
                    </div>
                );
            })}
        </div>
    );
};

export default Stats;
