"use client";

import { useState } from "react";

const IdiomList = () => {
    const idioms = [
        { id: 1, idiom: "Next JS is The React Framework" },
        { id: 2, idiom: "React Components is the main tool of NextJS" },
        { id: 3, idiom: "HTML is a markup language, like a Car Chassis" },
        { id: 4, idiom: "CSS is Body and Paint of a Car" },
        { id: 5, idiom: "Javascript is the Main Engine" },
        { id: 6, idiom: "Next JS is The React Framework" },
        { id: 7, idiom: "React Components is the main tool of NextJS" },
        { id: 8, idiom: "HTML is a markup language, like a Car Chassis" },
        { id: 9, idiom: "CSS is Body and Paint of a Car" },
        { id: 10, idiom: "Javascript is the Main Engine" },
    ];

    const initialLetterCounts = Array.from({ length: 26 }, (_, i) => ({
        letter: String.fromCharCode(97 + i),
        count: 0,
    }));

    const [letterCounts, setLetterCounts] = useState(initialLetterCounts);
    const [limit, setLimit] = useState(0);
    const [checkedCount, setCheckedCount] = useState(0);
    const [checkedBoxes, setCheckedBoxes] = useState({});

    const updateLetterCounts = (text, isAdding) => {
        const counts = {};

        for (const char of text.toLowerCase()) {
            if (/[a-z]/.test(char)) {
                counts[char] = (counts[char] || 0) + 1;
                // console.log(counts);
            }
        }

        setLetterCounts((prevCounts) =>
            prevCounts.map(({ letter }) => ({
                letter,
                count: isAdding
                    ? prevCounts.find((c) => c.letter === letter).count +
                      (counts[letter] || 0)
                    : Math.max(
                          0,
                          prevCounts.find((c) => c.letter === letter).count -
                              (counts[letter] || 0),
                      ),
            })),
        );
    };

    const handleCheckboxChange = (e, idiom) => {
        const isAdding = e.target.checked;
        updateLetterCounts(idiom.idiom, isAdding);

        setCheckedCount((prev) => prev + (isAdding ? 1 : -1));
        setCheckedBoxes((prev) => ({ ...prev, [idiom.id]: isAdding }));
    };

    const resetCounts = () => {
        setLetterCounts(initialLetterCounts);
        setCheckedCount(0);
        setLimit(0);
        setCheckedBoxes({});
    };

    return (
        <div className="">
            <div className=" justify-center">
                <div className="bg-white p-2">
                    <div className="mt-4 mb-4">
                        <input
                            type="number"
                            value={limit}
                            onChange={(e) =>
                                setLimit(Math.max(0, Number(e.target.value)))
                            }
                            placeholder="Set limit for checkboxes"
                            className="p-2 border"
                        />
                        <button
                            onClick={resetCounts}
                            className="ml-4 p-2 bg-red-500 text-white rounded"
                        >
                            Reset
                        </button>
                        <p className="mt-1">
                            Current limit: {limit} (Checked: {checkedCount})
                        </p>
                    </div>

                    {idioms.map((idiom) => (
                        <div
                            key={idiom.id}
                            className="flex bg-blue-200 rounded-lg pl-5 m-1"
                        >
                            <input
                                type="checkbox"
                                onChange={(e) => {
                                    if (
                                        e.target.checked &&
                                        checkedCount >= limit
                                    ) {
                                        e.preventDefault();
                                    } else {
                                        handleCheckboxChange(e, idiom);
                                    }
                                }}
                                disabled={checkedCount >= limit}
                                className="mr-2"
                                checked={checkedBoxes[idiom.id] || false}
                            />
                            <p className="p-2">
                                {idiom.id}. {idiom.idiom}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="items-center content-center p-10 bg-blue-300 ">
                    <div className="">
                        <h4 className="font-bold">Letter Counts:</h4>
                        <ul className="">
                            {letterCounts.map(({ letter, count }) => (
                                <li
                                    className="float-left font-medium text-center m-3 w-5"
                                    key={letter}
                                >
                                    {letter.toUpperCase()}
                                    <p
                                        className="font-semibold text-[20px]"
                                        key={count}
                                    >
                                        {count}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IdiomList;
