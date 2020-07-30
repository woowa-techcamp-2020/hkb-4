/*
	test("테스트 설명", () => {
  	expect("검증 대상").toXxx("기대 결과")
	})

	https://www.daleseo.com/jest-basic/

	toEqual(): 객체 검증
	toBeTruthy(), toBeFalsy(): true, false
	toHaveLength(), toContain(): 길이, 포함
	toMatch(): 정규식
	toThrow(): 예외 발생 여부


*/

test('1 is 1', () => {
	expect(1).toBe(1);
});

function getUser(id: number) {
	return {
		id,
		email: `user${id}@test.com`,
	};
}
test('return a user object', () => {
	expect(getUser(1)).toEqual({
		id: 1,
		email: `user1@test.com`,
	});
});
