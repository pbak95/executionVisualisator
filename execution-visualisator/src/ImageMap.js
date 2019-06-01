
const IMAGES = new Map();

IMAGES.set("execve", "./gear.png");
IMAGES.set("clone", "./clone.png");
IMAGES.set("write", "./keyboard.png");
IMAGES.set("pwrite", "./keyboard.png");
IMAGES.set("procexit", "./exit.png");
IMAGES.set("bind", "./network.png");
IMAGES.set("listen", "./network.png");
IMAGES.set("mkdir", "./dir.png");


export function getImage(state) {
    if (IMAGES.has(state)) {
        return IMAGES.get(state);
    } else {
        return "./help.png";
    }
}


