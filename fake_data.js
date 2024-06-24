import * as model from "./models.js"

const letter1 = new model.Letter({
    senderName: "user1",
    recieverName: "user2",
    sentTime: "2023-8-18",
    title: "Hi, nice to meet you",
    content: "I would like to be your penpal!"
});
const letter2 = new model.Letter({
    senderName: "user2",
    recieverName: "user1",
    sentTime: "2023-8-19",
    title: "Re: Hi, nice to meet you",
    content: "Sure! let's be penpals!"
});
const letter3 = new model.Letter({
    senderName: "user3",
    recieverName: "user1",
    sentTime: "2023-8-09",
    title: "Are you interested in crypto?",
    content: "Hi, are you interested in crypto? I have an exciting oppertunity for you! click the link below: www.suslink.com"
});
const user1penpal1 = new model.Penpal({
    penpalName: 'user2',
    penpalAbout: "I'm looking forward to making friends here! I'm currently a master student studying zoology. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae odio velit. Vivamus porttitor rutrum tincidunt. Mauris quis porttitor elit. Donec et massa fermentum, posuere quam eu, accumsan tellus. Mauris nec gravida urna. Donec ut leo a augue tempus egestas eget eleifend massa. Phasellus fringilla maximus elementum. Praesent finibus tempus turpis. Etiam quis dapibus lacus. Suspendisse potenti. Phasellus ex eros, egestas ut nisl eu, porta fermentum nisl. Fusce porttitor ultrices turpis sed gravida. Curabitur velit felis, finibus ut dui eu, tristique facilisis diam. Pellentesque vel quam eget purus cursus convallis et in nisl. Donec fringilla enim eget pretium ornare.",
    letterList: [letter1, letter2],
});
const user1penpal2 = new model.Penpal({
    penpalName: "user3",
    penpalAbout: "Everyone, click this link! suslink.com. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae odio velit. Vivamus porttitor rutrum tincidunt. Mauris quis porttitor elit. Donec et massa fermentum, posuere quam eu, accumsan tellus. Mauris nec gravida urna. Donec ut leo a augue tempus egestas eget eleifend massa. Phasellus fringilla maximus elementum. Praesent finibus tempus turpis. Etiam quis dapibus lacus. Suspendisse potenti. Phasellus ex eros, egestas ut nisl eu, porta fermentum nisl. Fusce porttitor ultrices turpis sed gravida. Curabitur velit felis, finibus ut dui eu, tristique facilisis diam. Pellentesque vel quam eget purus cursus convallis et in nisl. Donec fringilla enim eget pretium ornare.",
    letterList: [letter3],
});
const user2penpal1 = new model.Penpal({
    penpalName: "user1",
    penpalAbout: "Hi everyone, im a fisherman who likes to play sandbox games. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae odio velit. Vivamus porttitor rutrum tincidunt. Mauris quis porttitor elit. Donec et massa fermentum, posuere quam eu, accumsan tellus. Mauris nec gravida urna. Donec ut leo a augue tempus egestas eget eleifend massa. Phasellus fringilla maximus elementum. Praesent finibus tempus turpis. Etiam quis dapibus lacus. Suspendisse potenti. Phasellus ex eros, egestas ut nisl eu, porta fermentum nisl. Fusce porttitor ultrices turpis sed gravida. Curabitur velit felis, finibus ut dui eu, tristique facilisis diam. Pellentesque vel quam eget purus cursus convallis et in nisl. Donec fringilla enim eget pretium ornare.",
    letterList: [letter1, letter2],
});
const user3penpal1 = new model.Penpal({
    penpalName: "user1",
    penpalAbout: "Hi everyone, im a fisherman who likes to play sandbox games. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae odio velit. Vivamus porttitor rutrum tincidunt. Mauris quis porttitor elit. Donec et massa fermentum, posuere quam eu, accumsan tellus. Mauris nec gravida urna. Donec ut leo a augue tempus egestas eget eleifend massa. Phasellus fringilla maximus elementum. Praesent finibus tempus turpis. Etiam quis dapibus lacus. Suspendisse potenti. Phasellus ex eros, egestas ut nisl eu, porta fermentum nisl. Fusce porttitor ultrices turpis sed gravida. Curabitur velit felis, finibus ut dui eu, tristique facilisis diam. Pellentesque vel quam eget purus cursus convallis et in nisl. Donec fringilla enim eget pretium ornare.",
    letterList: [letter3],
});
const user1profileInfo = new model.UserProfileInfo({
    username: "user1",
    about: "Hi everyone, im a fisherman who likes to play sandbox games. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae odio velit. Vivamus porttitor rutrum tincidunt. Mauris quis porttitor elit. Donec et massa fermentum, posuere quam eu, accumsan tellus. Mauris nec gravida urna. Donec ut leo a augue tempus egestas eget eleifend massa. Phasellus fringilla maximus elementum. Praesent finibus tempus turpis. Etiam quis dapibus lacus. Suspendisse potenti. Phasellus ex eros, egestas ut nisl eu, porta fermentum nisl. Fusce porttitor ultrices turpis sed gravida. Curabitur velit felis, finibus ut dui eu, tristique facilisis diam. Pellentesque vel quam eget purus cursus convallis et in nisl. Donec fringilla enim eget pretium ornare.",
    age: null,
    interests: ["Fishing", "Reading", "Gaming"],
    languages: ["English", "Mandarin"], 
    from: "Middle Earth",
});
const user2profileInfo = new model.UserProfileInfo({
    username: "user2",
    about: "I'm looking forward to making friends here! I'm currently a master student studying zoology. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae odio velit. Vivamus porttitor rutrum tincidunt. Mauris quis porttitor elit. Donec et massa fermentum, posuere quam eu, accumsan tellus. Mauris nec gravida urna. Donec ut leo a augue tempus egestas eget eleifend massa. Phasellus fringilla maximus elementum. Praesent finibus tempus turpis. Etiam quis dapibus lacus. Suspendisse potenti. Phasellus ex eros, egestas ut nisl eu, porta fermentum nisl. Fusce porttitor ultrices turpis sed gravida. Curabitur velit felis, finibus ut dui eu, tristique facilisis diam. Pellentesque vel quam eget purus cursus convallis et in nisl. Donec fringilla enim eget pretium ornare.",
    age: 33,
    interests: ["Eating", "Dancing", "Writing", "Baking"],
    languages: ["French", "Spanish", "English"], 
    from: "hogwarts",
});
const user3profileInfo = new model.UserProfileInfo({
    username: "user3",
    about: "Everyone, click this link! suslink.com. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae odio velit. Vivamus porttitor rutrum tincidunt. Mauris quis porttitor elit. Donec et massa fermentum, posuere quam eu, accumsan tellus. Mauris nec gravida urna. Donec ut leo a augue tempus egestas eget eleifend massa. Phasellus fringilla maximus elementum. Praesent finibus tempus turpis. Etiam quis dapibus lacus. Suspendisse potenti. Phasellus ex eros, egestas ut nisl eu, porta fermentum nisl. Fusce porttitor ultrices turpis sed gravida. Curabitur velit felis, finibus ut dui eu, tristique facilisis diam. Pellentesque vel quam eget purus cursus convallis et in nisl. Donec fringilla enim eget pretium ornare.",
    age: null,
    interests: ["Skamming", "trolling"],
    languages: ["English"],
    from: null,
});
const user4profileInfo = new model.UserProfileInfo({
    username: "user4",
    about: "I'm the best! Be my penpal!",
    age: 100,
    interests: ["having fun", "being awesome"],
    languages: ["English"],
    from: null,
});
const user1 = new model.User({
    username: "user1",
    password: "abc",
    email: "user1@gmail.com",
    source: "Local",
    userProfileInfo: user1profileInfo,
    penpalList: [user1penpal1, user1penpal2],
});
const user2 = new model.User({
    username: "user2",
    password: "123",
    email: "user1@gmail.com",
    source: "Local",
    userProfileInfo: user2profileInfo,
    penpalList: [user2penpal1],
});
const user3 = new model.User({
    username: "user3",
    password: "123",
    email: "user1@gmail.com",
    source: "Local",
    userProfileInfo: user3profileInfo,
    penpalList: [user3penpal1],
});
const user4 = new model.User({
    username: "user4",
    password: "321",
    email: "user1@gmail.com",
    source: "Local",
    userProfileInfo: user4profileInfo,
    penpalList: [],
});

export async function saveDefaultData() {
    console.log("saving default data...");
    try {
        await Promise.all([
            letter1.save(),
            letter2.save(),
            letter3.save(),
            user1penpal1.save(),
            user1penpal2.save(),
            user2penpal1.save(),
            user3penpal1.save(),
            user1profileInfo.save(),
            user2profileInfo.save(),
            user3profileInfo.save(),
            user4profileInfo.save(),
            user1.save(),
            user2.save(),
            user3.save(),
            user4.save(),
        ]);
    } catch (err) {
        console.log(err);
    }
};
