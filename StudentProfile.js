document.addEventListener("DOMContentLoaded", function () {
    const studentForm = document.getElementById("student-form");
    const profilesList = document.getElementById("profiles-list");

    // Load stored profiles from localStorage (if any)
    let profiles = JSON.parse(localStorage.getItem("profiles")) || [];

    // Display the profiles in the profile container
    displayProfiles();

    // Add event listener for the form submission
    studentForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Get the values from the form
        const name = document.getElementById("name").value;
        const age = document.getElementById("age").value;
        const course = document.getElementById("course").value;
        const email = document.getElementById("email").value;

        // Create a new profile object
        const newProfile = {
            name: name,
            age: age,
            course: course,
            email: email,
        };

        // Add the new profile to the profiles array
        profiles.push(newProfile);

        // Save the updated profiles array to localStorage
        localStorage.setItem("profiles", JSON.stringify(profiles));

        // Reset the form
        studentForm.reset();

        // Display the updated profiles
        displayProfiles();
    });

    // Function to display profiles
    function displayProfiles() {
        // Clear the profiles list before displaying
        profilesList.innerHTML = '';

        if (profiles.length === 0) {
            profilesList.innerHTML = "<p>No profiles added yet.</p>";
        } else {
            // Loop through each profile and create a div to display the data
            profiles.forEach((profile, index) => {
                const profileDiv = document.createElement("div");
                profileDiv.classList.add("profile");

                profileDiv.innerHTML = `
                    <p><strong>Name:</strong> ${profile.name}</p>
                    <p><strong>Age:</strong> ${profile.age}</p>
                    <p><strong>Course:</strong> ${profile.course}</p>
                    <p><strong>Email:</strong> ${profile.email}</p>
                    <button class="delete-btn" data-index="${index}">Delete</button>
                `;

                // Append each profile to the profiles list
                profilesList.appendChild(profileDiv);
            });

            // Add delete button functionality
            const deleteButtons = document.querySelectorAll(".delete-btn");
            deleteButtons.forEach(button => {
                button.addEventListener("click", function (event) {
                    const index = event.target.getAttribute("data-index");
                    deleteProfile(index);
                });
            });
        }
    }

    // Function to delete a profile
    function deleteProfile(index) {
        // Remove the profile from the array
        profiles.splice(index, 1);

        // Update localStorage with the new array
        localStorage.setItem("profiles", JSON.stringify(profiles));

        // Display the updated profiles
        displayProfiles();
    }
});
