const STORE_DATA = {
    id: 1,
    contact: {
        displayName: "Vinit Khandelwal",
        bio: "Consulting MERN Stack Developer, AWS Certified Cloud Practitioner, ML with Python",
        primaryContactEmail: "vinit.k.khandelwal@gmail.com",
        primaryContactPhone: "+91 99239 08880",
        linkedinProfileUrl: "linkedin.com/in/khandelwalvinit",
        profilePhotoUrl: "https://media-exp1.licdn.com/dms/image/C4E03AQFRraKpmA7m9w/profile-displayphoto-shrink_200_200/0?e=1586390400&v=beta&t=qHRLGQ0KKQmuJ0GMGc_2PXmjZeYMbrh4Ob_PqN0rzGg",
        isCurrentlyWorking: true
    },
    worked: [
        {
            id: 1,
            companyName: "Cutshort",
            designation: "Core team member",
            startDate: new Date(2015, 8),
            endDate: new Date(2016, 10),
            workDescription: "Something I did"
        },
        {
            id: 2,
            companyName: "CVFY",
            designation: "Co-founder",
            startDate: new Date(2016, 11),
            endDate: null,
            workDescription: "Something I did again."
        }
    ]

}

export default STORE_DATA;