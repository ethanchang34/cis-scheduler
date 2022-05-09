import csvToJson from "csvtojson";
import { Course } from "../interfaces/Course";
import { Plan } from "../interfaces/Plan";
import { Semester } from "../interfaces/Semester";
import { Year } from "../interfaces/Year";
import { GetTokenSilentlyOptions, User } from "@auth0/auth0-react";
import { GetTokenSilentlyVerboseResponse } from "@auth0/auth0-spa-js";
import { UserData } from "../interfaces/UserData";

// interface ActiveCourse {
//     code: string;
//     name: string;
//     descr: string;
//     credits: string;
//     preReq: string;
//     restrict: string;
//     breadth: string;
//     typ: string;
// }

// const initialCourses: Record<string, Record<string, ActiveCourse>> = Catalog;
// Object.entries(initialCourses).forEach(
//     // Big hungo jungo method that fills the original courses object with our own courses.
//     ([subjectArea, courseRecord]: [string, Record<string, ActiveCourse>]) => {
//         Object.entries(courseRecord).forEach(
//             ([courseName, activeCourse]: [string, ActiveCourse]) => {
//                 const parseSems = activeCourse.typ.split(" ");
//                 let sems: number[] = [];

//                 if (parseSems.includes("Fall")) sems = [...sems, 0];
//                 if (parseSems.includes("Winter")) sems = [...sems, 1];
//                 if (parseSems.includes("Spring")) sems = [...sems, 2];
//                 if (parseSems.includes("Summer")) sems = [...sems, 3];

//                 const parseBreadth = activeCourse.breadth.split(";"); // Isolate university: and A&S: breadths
//                 let courseBreadth = parseBreadth[0].substring(12); // Grab the university breadth at truncate string to only include breadth
//                 if (
//                     courseBreadth.substring(courseBreadth.length - 10) ===
//                     "(HIST &amp"
//                 ) {
//                     courseBreadth = courseBreadth.substring(
//                         0,
//                         courseBreadth.length - 11
//                     );
//                 }

//                 const parseCredits = activeCourse.credits;
//                 let courseCredits = 0;
//                 if (!parseCredits.includes("-")) {
//                     courseCredits = parseInt(parseCredits[1]);
//                 }

//                 const newCourse: Course = {
//                     code: activeCourse.code, // Gets the code of course form "CISC 101"
//                     subjectArea: subjectArea, // "CISC"
//                     number: activeCourse.code.substring(5, 8), // Number of course stored as string
//                     name: activeCourse.name,
//                     descr: activeCourse.descr,
//                     tech: false, // All courses are not techs unless user sets them to be.
//                     breadth: courseBreadth, // String representing what university breadth the course satisfies,
//                     preReq: activeCourse.preReq,
//                     restrict: activeCourse.restrict,
//                     semsOffered: sems, // Array of numbers of sems offered. Empty array indicates no data, assume all?
//                     credits: courseCredits
//                 };

//                 originalCourses[courseName] = newCourse;
//             }
//         );
//     }
// );

export const getUserMetadata = async (
    setUserMetadata: React.Dispatch<React.SetStateAction<UserData | null>>,
    user: User | undefined,
    isAuthenticated: boolean,
    getAccessTokenSilently: {
        (
            options: GetTokenSilentlyOptions & {
                detailedResponse: true;
            }
        ): Promise<GetTokenSilentlyVerboseResponse>;
        (options?: GetTokenSilentlyOptions | undefined): Promise<string>;
        (options: GetTokenSilentlyOptions): Promise<string>;
    }
    //getAccessTokenSilently: (options?: GetTokenSilentlyOptions | undefined) => Promise<string>
) => {
    const domain = "dev--0t6-2tu.us.auth0.com";

    if (user && isAuthenticated) {
        try {
            const accessToken = await getAccessTokenSilently({
                audience: `https://${domain}/api/v2/`,
                scope: "read:current_user update:current_user_metadata"
            });

            const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

            const metadataResponse = await fetch(userDetailsByIdUrl, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            const { user_metadata } = await metadataResponse.json();
            setUserMetadata(user_metadata);
        } catch (e) {
            if (typeof e === "string") {
                console.log(e.toUpperCase()); // works, `e` narrowed to string
            } else if (e instanceof Error) {
                console.log(e.message); // works, `e` narrowed to Error
            }
        }
    }
};

//updating metadata?
export const updateMetadata = async (
    userProgress: string,
    user: User | undefined,
    isAuthenticated: boolean,
    getAccessTokenSilently: {
        (
            options: GetTokenSilentlyOptions & {
                detailedResponse: true;
            }
        ): Promise<GetTokenSilentlyVerboseResponse>;
        (options?: GetTokenSilentlyOptions | undefined): Promise<string>;
        (options: GetTokenSilentlyOptions): Promise<string>;
    }
) => {
    const domain = "dev--0t6-2tu.us.auth0.com";

    if (user && isAuthenticated) {
        try {
            const accessToken = await getAccessTokenSilently({
                audience: `https://${domain}/api/v2/`,
                scope: "read:current_user update:current_user_metadata"
            });

            const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

            await fetch(userDetailsByIdUrl, {
                method: "PATCH",
                body: userProgress,
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "content-type": "application/json"
                }
            });
        } catch (e) {
            if (typeof e === "string") {
                console.log(e.toUpperCase()); // works, `e` narrowed to string
            } else if (e instanceof Error) {
                console.log(e.message); // works, `e` narrowed to Error
            }
        }
    }
};

export const uploadPlans = (
    plans: Plan[],
    setPlans: React.Dispatch<React.SetStateAction<Plan[]>>,
    event: React.ChangeEvent<HTMLInputElement>
) => {
    // Might have removed the file, need to check that the files exist
    if (event.target.files && event.target.files.length) {
        // Get the first filename
        const filename = event.target.files[0];
        // Create a reader
        const reader = new FileReader();
        // Create lambda callback to handle when we read the file
        reader.onload = (loadEvent) => {
            // Target might be null, so provide default error value
            let newContent = loadEvent.target?.result || "Data was not loaded";
            // FileReader provides string or ArrayBuffer, force it to be string
            newContent = newContent.toString();

            csvToJson()
                .fromString(newContent)
                .then((csvRow) => {
                    if (csvRow[0]["title"]) {
                        // This is a plans object
                        console.log(csvRow);
                        localStorage.removeItem("CISC275-4-selectedID");
                        setPlans(
                            csvRow.map((csvPlan, idNum): Plan => {
                                const numYears = csvPlan["numYears"];
                                let newYears: Year[] = [];
                                for (let i = 0; i < numYears; i++) {
                                    const tempYear: Year = {
                                        id: idNum * 40 + i * 4,
                                        semesters: []
                                    };
                                    for (let j = i * 4; j < i * 4 + 4; j++) {
                                        let tempCourses = [];
                                        if (csvPlan["semester_" + j]) {
                                            tempCourses =
                                                csvPlan["semester_" + j].split(
                                                    ","
                                                );
                                        }
                                        csvPlan["semester_" + j].split(",");
                                        tempYear.semesters = [
                                            ...tempYear.semesters,
                                            {
                                                id: idNum * 40 + j,
                                                active:
                                                    csvPlan["semester_" + j]
                                                        .length !== 0,
                                                courses: tempCourses
                                            }
                                        ];
                                    }
                                    newYears = [...newYears, tempYear];
                                }
                                return {
                                    id: idNum,
                                    title: csvPlan["title"],
                                    description: csvPlan["description"],
                                    years: newYears
                                };
                            })
                        );
                    } else {
                        console.log("This is invalid data format");
                    }
                });
        };
        // Actually read the file
        reader.readAsText(filename);
    }
};

export const downloadPlans = (plans: Plan[]) => {
    let csv = "";
    if (plans) {
        let header = ["title", "description", "numYears"];
        const yearNumArr = plans.map((p: Plan): number => p.years.length);
        const numYears = Math.max(...yearNumArr);
        for (let i = 0; i < numYears; i++) {
            const j = i * 4;
            header = [
                ...header,
                ("semester_" + j) as string,
                ("semester_" + (j + 1)) as string,
                ("semester_" + (j + 2)) as string,
                ("semester_" + (j + 3)) as string
            ];
        }
        const planStrings: string = plans
            .map((p: Plan): string => {
                const semestersString = p.years
                    .map((y: Year): string => {
                        return y.semesters
                            .map((s: Semester): string => {
                                return (
                                    '"' +
                                    s.courses.toString().replaceAll('"', '""') +
                                    '"'
                                );
                            })
                            .join(",");
                    })
                    .join(",");
                return (
                    '"' +
                    p.title.toString().replaceAll('"', '""') +
                    '"' +
                    "," +
                    '"' +
                    p.description.toString().replaceAll('"', '""') +
                    '"' +
                    "," +
                    '"' +
                    p.years.length.toString().replaceAll('"', '""') +
                    '"' +
                    "," +
                    semestersString
                );
            })
            .join("\r\n");

        csv = [header, planStrings].join("\r\n");
        downloadBlob(csv, "PlansExport.csv", "text/csv;charset=utf-8;");
    }
};

export const uploadCourse = (
    modifiedCourses: Record<string, Course>,
    setModifiedCourses: (newCourses: Record<string, Course>) => void,
    event: React.ChangeEvent<HTMLInputElement>
) => {
    // Might have removed the file, need to check that the files exist
    if (event.target.files && event.target.files.length) {
        // Get the first filename
        const filename = event.target.files[0];
        // Create a reader
        const reader = new FileReader();
        // Create lambda callback to handle when we read the file
        reader.onload = (loadEvent) => {
            // Target might be null, so provide default error value
            let newContent = loadEvent.target?.result || "Data was not loaded";
            // FileReader provides string or ArrayBuffer, force it to be string
            newContent = newContent.toString();

            csvToJson()
                .fromString(newContent)
                .then((csvRow) => {
                    if (csvRow[0]["code"]) {
                        // This is a course object
                        console.log("This is a course object");
                        const importedModifiedCourses: Record<string, Course> =
                            {};
                        csvRow.forEach((csvCourse) => {
                            const newCode = csvCourse["code"];
                            const insertingCourse: Course = {
                                code: csvCourse["code"],
                                subjectArea: csvCourse["subjectArea"],
                                number: csvCourse["number"],
                                name: csvCourse["name"],
                                descr: csvCourse["descr"],
                                tech: csvCourse["tech"] === "true",
                                multicultural:
                                    csvCourse["multicultural"] === "true",
                                breadth: csvCourse["breadth"],
                                preReq: csvCourse["preReq"],
                                restrict: csvCourse["restrict"],
                                semsOffered: csvCourse["semsOffered"]
                                    .split(",")
                                    .map((s: string) => parseInt(s)),
                                credits: parseInt(csvCourse["credits"])
                            };
                            importedModifiedCourses[newCode] = insertingCourse;
                        });
                        localStorage.removeItem("CISC275-4-modifiedCourses");
                        localStorage.setItem(
                            "CISC275-4-modifiedCourses",
                            JSON.stringify(importedModifiedCourses)
                        );
                        setModifiedCourses({
                            ...modifiedCourses,
                            ...importedModifiedCourses
                        });
                    } else {
                        console.log("This is invalid data format");
                    }
                });
        };
        // Actually read the file
        reader.readAsText(filename);
    }
};

export const downloadCourses = () => {
    const saved = localStorage.getItem("CISC275-4-modifiedCourses");
    let csv = "";
    if (saved) {
        const testCourse: Course = {
            code: "",
            subjectArea: "",
            number: "",
            name: "",
            descr: "",
            tech: false,
            multicultural: false,
            breadth: "",
            preReq: "",
            restrict: "",
            semsOffered: [],
            credits: 0
        };
        const changedCourses: Record<string, Course> = JSON.parse(saved);
        csv = [
            Object.keys(testCourse)
                .map((val) => val.toString())
                .join(","),
            Object.values(changedCourses)
                .map((course: Course): string =>
                    Object.values(course)
                        .map((val: string | number[] | boolean): string => {
                            return (
                                '"' + val.toString().replaceAll('"', '""') + '"'
                            );
                        })
                        .join(",")
                )
                .join("\r\n")
        ].join("\r\n");
    }
    downloadBlob(csv, "CoursesExport.csv", "text/csv;charset=utf-8;");
};

/** Download contents as a file
 * Source: https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side
 */
export const downloadBlob = (
    csv: string,
    filename: string,
    contentType: string
) => {
    if (!csv) {
        console.log("No saved content");
        return;
    }
    // Create a blob
    const blob = new Blob([csv], { type: contentType });
    const url = URL.createObjectURL(blob);

    // Create a link to download it
    const pom = document.createElement("a");
    pom.href = url;
    pom.setAttribute("download", filename);
    pom.click();
};
