import { Subject } from 'rxjs';

const subject = new Subject();

export const userService = {
    setUser: user => subject.next(user),
    clearUser: () => subject.next(),
    getUser: () => subject.asObservable()
};