import React from "react";

const Stats = ({ sales }) => {
    const pils = sales?.map((obj) => obj.pils_name);

    let counter = {};
    pils?.forEach((val) => (counter[val] = (counter[val] || 0) + 1));

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
