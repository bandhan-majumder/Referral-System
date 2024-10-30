import { atom } from "recoil";

// true if the user has signed in completely and false if not
export const ProfileAtom = atom({
    default: false,
    key: "profileA",
    effects: [
        ({setSelf, onSet}) => {
            // Get initial value from localStorage
            const savedValue = localStorage.getItem("profileA");
            if (savedValue != null) {
                setSelf(JSON.parse(savedValue));
            }

            // Save to localStorage on every change
            onSet((newValue) => {
                localStorage.setItem("profileA", JSON.stringify(newValue));
            });
        }
    ]
})
