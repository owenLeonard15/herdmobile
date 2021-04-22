// This test just demonstrates whether the test environment is working
describe('truth', () => {
    it('is true', () => {
      expect(true).toEqual(true);
    });
});


import { getIsFollowing, follow, unfollow, listAllUsers} from '../views/DiscoverFriends';
describe('getIsFollowing', () => {
    it('returns false', () => {
        const result = getIsFollowing("username")
        expect(result).toEqual('false');
    });
});

describe('follow', () => {
    it('returns boolean for success', () => {
        const result = follow("username")
        expect(result).toEqual('true');
    })
});

describe('unfollow', () => {
    it('returns boolean for success', () => {
        const result = unfollow("username")
        expect(result).toEqual('true');
    });
});

describe('listAllUsers', () => {
    it('returns array', () => {
        const result = listAllUsers("!");
        expect(result.length).toEqual(0);
    });
});

import { listFollowers, listFollowing } from '../views/MyFriendSearch'
describe('listFollowers', () => {
    it('returns array', () => {
        const result = listFollowers("username");
        expect(result.length).toBeDefined();
        expect(result.length).toBeGreaterThan(0);
    });
});


describe('listFollowing', () => {
    it('returns array', () => {
        const result = listFollowing("username");
        expect(result.length).toBeDefined();
        expect(result.length).toBeGreaterThan(0);
    });
});
