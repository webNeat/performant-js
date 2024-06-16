/**
 * @typedef {Object} Guest
 * @property {string} name
 */

/**
 * @typedef {Object} Invitation
 * @property {string} guestName
 */

/**
 * @typedef {Object} Input
 * @property {Guest[]} guests
 * @property {Invitation[]} invitations
 */

const guests = [];
const invitations = [];
for (let i = 1; i < 100_000; i++) guests.push({ name: `guest-${i}` });
for (let i = 1; i < 50_000; i++)
  invitations.push({ guestName: `guest-${i * 2}` });

export const inputs = {
  "1k guests and 500 invitations": {
    guests: guests.slice(0, 1000),
    invitations: invitations.slice(0, 500),
  },
  "10k guests and 5k invitations": {
    guests: guests.slice(0, 10_000),
    invitations: invitations.slice(0, 5000),
  },
  "100k guests and 50k invitations": {
    guests,
    invitations,
  },
};

/**
 * @param {Input} input
 * @returns {Guest[]}
 */
function slow_solution({ guests, invitations }) {
  return guests.filter((guest) => {
    const invitation = invitations.find((x) => x.guestName === guest.name);
    return invitation ? true : false;
  });
}
/**
 * @param {Input} input
 * @returns {Guest[]}
 */
function faster_solution({ guests, invitations }) {
  const invitedNames = new Set(invitations.map((x) => x.guestName));
  return guests.filter((guest) => invitedNames.has(guest.name));
}

export const fns = { slow_solution, faster_solution };
