/* =========================================================
   CAREERHUB - MAIN JAVASCRIPT
   Frontend prototype using localStorage
========================================================= */


/* =========================================================
   USER MANAGEMENT
========================================================= */

function getUser() {

    try {

        return JSON.parse(
            localStorage.getItem("careerHubUser")
        ) || null;

    } catch (error) {

        return null;

    }

}


/* =========================================================
   REGISTER
========================================================= */

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name =
            document.getElementById("registerName").value.trim();

        const email =
            document.getElementById("registerEmail").value.trim();

        const phone =
            document.getElementById("registerPhone").value.trim();

        const role =
            document.getElementById("registerRole").value;

        const password =
            document.getElementById("registerPassword").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        const message =
            document.getElementById("registerMessage");


        if (password !== confirmPassword) {

            message.innerHTML = `
                <div class="alert alert-danger">
                    Passwords do not match.
                </div>
            `;

            return;

        }


        if (password.length < 6) {

            message.innerHTML = `
                <div class="alert alert-danger">
                    Password must contain at least 6 characters.
                </div>
            `;

            return;

        }


        const user = {

            name: name,
            email: email,
            phone: phone,
            role: role,
            password: password,

            skills: [
                "Python",
                "HTML",
                "CSS",
                "JavaScript",
                "Bootstrap",
                "SQL",
                "Machine Learning",
                "Power BI"
            ]

        };


        localStorage.setItem(
            "careerHubUser",
            JSON.stringify(user)
        );

        localStorage.setItem(
            "loggedIn",
            "true"
        );


        message.innerHTML = `
            <div class="alert alert-success">
                Account created successfully!
            </div>
        `;


        setTimeout(function () {

            window.location.href = "index.html";

        }, 1000);

    });

}


/* =========================================================
   LOGIN
========================================================= */

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const email =
            document.getElementById("loginEmail").value.trim();

        const password =
            document.getElementById("loginPassword").value;

        const message =
            document.getElementById("loginMessage");


        const user = getUser();


        if (!user) {

            message.innerHTML = `
                <div class="alert alert-warning">
                    No account found. Please register first.
                </div>
            `;

            return;

        }


        if (
            email.toLowerCase() === user.email.toLowerCase() &&
            password === user.password
        ) {

            localStorage.setItem(
                "loggedIn",
                "true"
            );


            message.innerHTML = `
                <div class="alert alert-success">
                    Login successful!
                </div>
            `;


            setTimeout(function () {

                window.location.href = "index.html";

            }, 700);

        } else {

            message.innerHTML = `
                <div class="alert alert-danger">
                    Invalid email or password.
                </div>
            `;

        }

    });

}


/* =========================================================
   PASSWORD TOGGLE
========================================================= */

function togglePassword(inputId, iconId) {

    const input =
        document.getElementById(inputId);

    const icon =
        document.getElementById(iconId);


    if (!input || !icon) {
        return;
    }


    if (input.type === "password") {

        input.type = "text";

        icon.classList.remove("bi-eye");

        icon.classList.add("bi-eye-slash");

    } else {

        input.type = "password";

        icon.classList.remove("bi-eye-slash");

        icon.classList.add("bi-eye");

    }

}


/* =========================================================
   JOB SEARCH
========================================================= */

function filterJobs() {

    const searchInput =
        document.getElementById("jobSearch");

    const locationInput =
        document.getElementById("jobLocation");

    const matchInput =
        document.getElementById("matchFilter");

    const trustInput =
        document.getElementById("trustFilter");


    if (!searchInput) {
        return;
    }


    const search =
        searchInput.value.toLowerCase().trim();

    const location =
        locationInput ? locationInput.value : "all";

    const minimumMatch =
        matchInput ? Number(matchInput.value) : 0;

    const minimumTrust =
        trustInput ? Number(trustInput.value) : 0;


    const jobs =
        document.querySelectorAll(".job-wrapper");


    let visibleJobs = 0;


    jobs.forEach(function (job) {

        const title =
            (job.dataset.title || "").toLowerCase();

        const company =
            (job.dataset.company || "").toLowerCase();

        const jobLocation =
            job.dataset.location || "";

        const skills =
            (job.dataset.skills || "").toLowerCase();

        const match =
            Number(job.dataset.match || 0);

        const trust =
            Number(job.dataset.trust || 0);


        const searchMatch =
            title.includes(search) ||
            company.includes(search) ||
            skills.includes(search);


        const locationMatch =
            location === "all" ||
            jobLocation === location;


        const matchScore =
            match >= minimumMatch;


        const trustScore =
            trust >= minimumTrust;


        if (
            searchMatch &&
            locationMatch &&
            matchScore &&
            trustScore
        ) {

            job.classList.remove("d-none");

            visibleJobs++;

        } else {

            job.classList.add("d-none");

        }

    });


    const count =
        document.getElementById("jobCount");

    if (count) {

        count.textContent =
            visibleJobs + (visibleJobs === 1 ? " Job" : " Jobs");

    }


    const noJobs =
        document.getElementById("noJobs");

    if (noJobs) {

        if (visibleJobs === 0) {

            noJobs.classList.remove("d-none");

        } else {

            noJobs.classList.add("d-none");

        }

    }

}


/* Search event listeners */

document.addEventListener("DOMContentLoaded", function () {

    const jobSearch =
        document.getElementById("jobSearch");

    const jobLocation =
        document.getElementById("jobLocation");

    const matchFilter =
        document.getElementById("matchFilter");

    const trustFilter =
        document.getElementById("trustFilter");


    if (jobSearch) {

        jobSearch.addEventListener(
            "input",
            filterJobs
        );

    }


    if (jobLocation) {

        jobLocation.addEventListener(
            "change",
            filterJobs
        );

    }


    if (matchFilter) {

        matchFilter.addEventListener(
            "change",
            filterJobs
        );

    }


    if (trustFilter) {

        trustFilter.addEventListener(
            "change",
            filterJobs
        );


    }


    filterJobs();

});


/* =========================================================
   INTERNSHIP SEARCH
========================================================= */

function filterInternships() {

    const searchInput =
        document.getElementById("internshipSearch");

    const typeInput =
        document.getElementById("internshipType");


    if (!searchInput) {
        return;
    }


    const search =
        searchInput.value.toLowerCase().trim();

    const type =
        typeInput ? typeInput.value : "all";


    const internships =
        document.querySelectorAll(".internship-wrapper");


    let visible = 0;


    internships.forEach(function (internship) {

        const data =
            (internship.dataset.search || "").toLowerCase();

        const internshipType =
            internship.dataset.type || "";


        const searchMatch =
            data.includes(search);

        const typeMatch =
            type === "all" ||
            internshipType === type;


        if (searchMatch && typeMatch) {

            internship.classList.remove("d-none");

            visible++;

        } else {

            internship.classList.add("d-none");

        }

    });


    const empty =
        document.getElementById("noInternships");


    if (empty) {

        if (visible === 0) {

            empty.classList.remove("d-none");

        } else {

            empty.classList.add("d-none");

        }

    }

}


document.addEventListener("DOMContentLoaded", function () {

    const search =
        document.getElementById("internshipSearch");

    const type =
        document.getElementById("internshipType");


    if (search) {

        search.addEventListener(
            "input",
            filterInternships
        );

    }


    if (type) {

        type.addEventListener(
            "change",
            filterInternships
        );

    }


    filterInternships();

});


/* =========================================================
   APPLICATION MANAGEMENT
========================================================= */

function getApplications() {

    try {

        return JSON.parse(
            localStorage.getItem("applications")
        ) || [];

    } catch (error) {

        return [];

    }

}


function saveApplications(applications) {

    localStorage.setItem(
        "applications",
        JSON.stringify(applications)
    );

}


/* =========================================================
   APPLY FOR JOB / INTERNSHIP
========================================================= */

function applyForOpportunity(
    jobTitle,
    company,
    location,
    salary,
    skills,
    matchScore,
    trustScore,
    hiringStatus
) {


    let applications =
        getApplications();


    const exists =
        applications.some(function (application) {

            return (
                application.jobTitle === jobTitle &&
                application.company === company
            );

        });


    if (exists) {

        alert(
            "You have already applied for this opportunity."
        );

        return;

    }


    const application = {

        id: Date.now(),

        jobTitle: jobTitle,

        company: company,

        location: location || "Not specified",

        salary: salary || "Not specified",

        skills: skills || "",

        matchScore: Number(matchScore) || 0,

        trustScore: Number(trustScore) || 0,

        hiringStatus: hiringStatus || "Active",

        status: "Applied",

        date: new Date().toLocaleDateString(),

        timeline: [

            {
                status: "Applied",
                date: new Date().toLocaleDateString(),
                completed: true
            },

            {
                status: "Under Review",
                date: "",
                completed: false
            },

            {
                status: "Interview",
                date: "",
                completed: false
            },

            {
                status: "Selected",
                date: "",
                completed: false
            }

        ]

    };


    applications.unshift(application);


    saveApplications(applications);


    alert(
        "Application submitted successfully!"
    );


    window.location.href =
        "applications.html";

}


/* =========================================================
   DISPLAY APPLICATIONS
========================================================= */

function displayApplications() {

    const list =
        document.getElementById("applicationList");

    const empty =
        document.getElementById("emptyMessage");


    if (!list) {
        return;
    }


    const applications =
        getApplications();


    updateApplicationStats(
        applications
    );


    if (applications.length === 0) {

        list.innerHTML = "";

        if (empty) {

            empty.classList.remove("d-none");

        }

        return;

    }


    if (empty) {

        empty.classList.add("d-none");

    }


    list.innerHTML = "";


    applications.forEach(function (application) {

        const card =
            document.createElement("div");


        card.className =
            "application-card mb-4";


        const statusClass =
            getStatusClass(
                application.status
            );


        card.innerHTML = `

            <div class="application-card-header">

                <div class="application-company-logo">
                    ${getInitials(application.company)}
                </div>

                <div class="application-main">

                    <h4>
                        ${escapeHTML(application.jobTitle)}
                    </h4>

                    <p>
                        <i class="bi bi-building"></i>
                        ${escapeHTML(application.company)}
                    </p>

                </div>

                <span class="status ${statusClass}">
                    ${escapeHTML(application.status)}
                </span>

            </div>


            <div class="application-details">

                <span>
                    <i class="bi bi-geo-alt"></i>
                    ${escapeHTML(application.location)}
                </span>

                <span>
                    <i class="bi bi-cash-stack"></i>
                    ${escapeHTML(application.salary)}
                </span>

                <span>
                    <i class="bi bi-calendar3"></i>
                    Applied ${escapeHTML(application.date)}
                </span>

                <span>
                    <i class="bi bi-bullseye"></i>
                    ${application.matchScore}% Match
                </span>

            </div>


            <div class="application-progress">

                <div class="application-step active">
                    <div class="step-dot">
                        <i class="bi bi-check"></i>
                    </div>
                    <small>Applied</small>
                </div>

                <div class="application-line ${application.status !== "Applied" ? "active" : ""}"></div>

                <div class="application-step ${application.status !== "Applied" ? "active" : ""}">
                    <div class="step-dot">
                        <i class="bi bi-search"></i>
                    </div>
                    <small>Review</small>
                </div>

                <div class="application-line ${["Interview","Selected"].includes(application.status) ? "active" : ""}"></div>

                <div class="application-step ${["Interview","Selected"].includes(application.status) ? "active" : ""}">
                    <div class="step-dot">
                        <i class="bi bi-camera-video"></i>
                    </div>
                    <small>Interview</small>
                </div>

                <div class="application-line ${application.status === "Selected" ? "active" : ""}"></div>

                <div class="application-step ${application.status === "Selected" ? "active" : ""}">
                    <div class="step-dot">
                        <i class="bi bi-trophy"></i>
                    </div>
                    <small>Selected</small>
                </div>

            </div>


            <div class="application-footer">

                <span>
                    <i class="bi bi-shield-check"></i>
                    Job Trust: ${application.trustScore}%
                </span>

                <button
                    class="btn btn-sm btn-outline-danger"
                    onclick="removeApplication(${application.id})">

                    <i class="bi bi-trash"></i>
                    Remove

                </button>

            </div>

        `;


        list.appendChild(card);

    });

}


/* =========================================================
   APPLICATION STATS
========================================================= */

function updateApplicationStats(
    applications
) {

    const total =
        document.getElementById("totalApplications");

    const review =
        document.getElementById("reviewApplications");

    const interviews =
        document.getElementById("interviewApplications");

    const selected =
        document.getElementById("selectedApplications");


    if (total) {

        total.textContent =
            applications.length;

    }


    if (review) {

        review.textContent =
            applications.filter(function (application) {

                return application.status === "Under Review";

            }).length;

    }


    if (interviews) {

        interviews.textContent =
            applications.filter(function (application) {

                return application.status === "Interview";

            }).length;

    }


    if (selected) {

        selected.textContent =
            applications.filter(function (application) {

                return application.status === "Selected";

            }).length;

    }

}


/* =========================================================
   REMOVE APPLICATION
========================================================= */

function removeApplication(id) {

    const confirmDelete =
        confirm(
            "Remove this application?"
        );


    if (!confirmDelete) {
        return;
    }


    const applications =
        getApplications();


    const updated =
        applications.filter(function (application) {

            return application.id !== id;

        });


    saveApplications(updated);


    displayApplications();

}


/* =========================================================
   JOB MATCH ANALYSIS
========================================================= */

function showJobAnalysis(
    title,
    company,
    location,
    salary,
    skills,
    matchScore,
    trustScore,
    hiringStatus
) {


    const content =
        document.getElementById("analysisContent");


    if (!content) {
        return;
    }


    const requiredSkills =
        skills
            .split(",")
            .map(function (skill) {

                return skill.trim();

            })
            .filter(Boolean);


    const user =
        getUser();


    const userSkills =
        user && Array.isArray(user.skills)
            ? user.skills
            : [
                "Python",
                "HTML",
                "CSS",
                "JavaScript",
                "Bootstrap",
                "SQL",
                "Machine Learning",
                "Power BI"
            ];


    const normalizedUserSkills =
        userSkills.map(function (skill) {

            return skill.toLowerCase().trim();

        });


    const matchedSkills =
        requiredSkills.filter(function (skill) {

            return normalizedUserSkills.includes(
                skill.toLowerCase()
            );

        });


    const missingSkills =
        requiredSkills.filter(function (skill) {

            return !normalizedUserSkills.includes(
                skill.toLowerCase()
            );

        });


    const matchLabel =
        matchScore >= 85
            ? "Excellent Match"
            : matchScore >= 70
                ? "Good Match"
                : "Needs Improvement";


    let matchedHTML = "";


    matchedSkills.forEach(function (skill) {

        matchedHTML += `
            <span class="analysis-skill matched">
                <i class="bi bi-check-circle-fill"></i>
                ${escapeHTML(skill)}
            </span>
        `;

    });


    let missingHTML = "";


    missingSkills.forEach(function (skill) {

        missingHTML += `
            <span class="analysis-skill missing">
                <i class="bi bi-exclamation-circle-fill"></i>
                ${escapeHTML(skill)}
            </span>
        `;

    });


    if (!matchedHTML) {

        matchedHTML =
            `<span class="text-muted">No direct skill matches found.</span>`;

    }


    if (!missingHTML) {

        missingHTML =
            `<span class="text-success">No major skill gaps detected.</span>`;

    }


    content.innerHTML = `

        <div class="analysis-job-title">

            <div class="company-logo">
                ${getInitials(company)}
            </div>

            <div>

                <h4>
                    ${escapeHTML(title)}
                </h4>

                <p>
                    ${escapeHTML(company)}
                    •
                    ${escapeHTML(location)}
                </p>

            </div>

        </div>


        <div class="analysis-score">

            <div class="analysis-score-circle">
                ${matchScore}%
            </div>

            <div>

                <small>YOUR MATCH</small>

                <h4>
                    ${matchLabel}
                </h4>

                <p>
                    Your current skills were compared
                    with the listed requirements.
                </p>

            </div>

        </div>


        <div class="analysis-grid">

            <div class="analysis-stat">

                <i class="bi bi-shield-check"></i>

                <span>Job Trust</span>

                <strong>${trustScore}%</strong>

            </div>


            <div class="analysis-stat">

                <i class="bi bi-activity"></i>

                <span>Hiring Status</span>

                <strong>${escapeHTML(hiringStatus)}</strong>

            </div>


            <div class="analysis-stat">

                <i class="bi bi-cash-stack"></i>

                <span>Salary</span>

                <strong>${escapeHTML(salary)}</strong>

            </div>

        </div>


        <div class="analysis-section">

            <h5>
                <i class="bi bi-check-circle"></i>
                Matching Skills
            </h5>

            <div class="analysis-skills">
                ${matchedHTML}
            </div>

        </div>


        <div class="analysis-section">

            <h5>
                <i class="bi bi-lightbulb"></i>
                Skill Gap
            </h5>

            <div class="analysis-skills">
                ${missingHTML}
            </div>

        </div>


        <div class="recommendation-box">

            <i class="bi bi-stars"></i>

            <div>

                <strong>Recommendation</strong>

                <p>
                    ${
                        missingSkills.length > 0
                        ? "Improve your " +
                          missingSkills.join(", ") +
                          " skills to increase your compatibility with this role."
                        : "Your current profile covers the listed skills well. This opportunity is worth considering."
                    }
                </p>

            </div>

        </div>


        <button
            class="primary-btn full-btn mt-3"
            onclick="applyForOpportunity(
                '${escapeJS(title)}',
                '${escapeJS(company)}',
                '${escapeJS(location)}',
                '${escapeJS(salary)}',
                '${escapeJS(skills)}',
                ${matchScore},
                ${trustScore},
                '${escapeJS(hiringStatus)}'
            )">

            <i class="bi bi-send"></i>
            Apply Now

        </button>

    `;


    const modalElement =
        document.getElementById("jobAnalysisModal");


    if (modalElement) {

        const modal =
            new bootstrap.Modal(
                modalElement
            );

        modal.show();

    }

}


/* =========================================================
   SAVE JOB
========================================================= */

function saveJob(
    jobTitle,
    company
) {

    let savedJobs = [];


    try {

        savedJobs =
            JSON.parse(
                localStorage.getItem("savedJobs")
            ) || [];

    } catch (error) {

        savedJobs = [];

    }


    const exists =
        savedJobs.some(function (job) {

            return (
                job.jobTitle === jobTitle &&
                job.company === company
            );

        });


    if (exists) {

        alert("Job is already saved.");

        return;

    }


    savedJobs.push({

        jobTitle: jobTitle,
        company: company,
        date: new Date().toLocaleDateString()

    });


    localStorage.setItem(
        "savedJobs",
        JSON.stringify(savedJobs)
    );


    alert("Job saved successfully!");

}


/* =========================================================
   PROFILE
========================================================= */

function loadProfile() {

    const user =
        getUser();


    if (!user) {
        return;
    }


    const name =
        document.getElementById("profileName");

    const email =
        document.getElementById("profileEmail");

    const initials =
        document.getElementById("profileInitials");


    if (name && user.name) {

        name.textContent =
            user.name;

    }


    if (email && user.email) {

        email.textContent =
            user.email;

    }


    if (initials && user.name) {

        initials.textContent =
            getInitials(user.name);

    }


    const profileApplications =
        document.getElementById("profileApplications");


    if (profileApplications) {

        profileApplications.textContent =
            getApplications().length;

    }

}


/* =========================================================
   EDIT PROFILE
========================================================= */

function editProfile() {

    const user =
        getUser();


    if (!user) {

        alert(
            "Please register or login first."
        );

        return;

    }


    const newName =
        prompt(
            "Enter your name:",
            user.name || ""
        );


    if (!newName) {
        return;
    }


    user.name =
        newName.trim();


    localStorage.setItem(
        "careerHubUser",
        JSON.stringify(user)
    );


    loadProfile();


    alert(
        "Profile updated successfully!"
    );

}


/* =========================================================
   RESUME
========================================================= */

function uploadResume() {

    const input =
        document.getElementById("resumeInput");


    if (!input || !input.files.length) {

        alert(
            "Please select a PDF resume."
        );

        return;

    }


    const file =
        input.files[0];


    if (
        file.type !== "application/pdf" &&
        !file.name.toLowerCase().endsWith(".pdf")
    ) {

        alert(
            "Please upload a PDF file."
        );

        return;

    }


    alert(
        "Resume selected successfully!"
    );

}


/* =========================================================
   UTILITY FUNCTIONS
========================================================= */

function getInitials(name) {

    if (!name) {
        return "CH";
    }


    const words =
        name.trim().split(/\s+/);


    if (words.length === 1) {

        return words[0]
            .substring(0, 2)
            .toUpperCase();

    }


    return (
        words[0].charAt(0) +
        words[words.length - 1].charAt(0)
    ).toUpperCase();

}


function getStatusClass(status) {

    switch (status) {

        case "Selected":
            return "status-selected";

        case "Interview":
            return "status-interview";

        case "Rejected":
            return "status-rejected";

        case "Under Review":
            return "status-review";

        default:
            return "status-applied";

    }

}


function escapeHTML(value) {

    return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


function escapeJS(value) {

    return String(value || "")
        .replace(/\\/g, "\\\\")
        .replace(/'/g, "\\'")
        .replace(/"/g, '\\"')
        .replace(/\n/g, "\\n")
        .replace(/\r/g, "\\r");

}


/* =========================================================
   PAGE LOAD
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        displayApplications();

        loadProfile();

    }
);