package com.sist.back.util;

import java.io.File;

public class FileRenameUtil {

	public static String checkSameFileName(String fileName, String path) {
		// 인자인 fileName에서 확장자를 뺀 파일명을 가려내자 (똑같은 파일명이 있다면 뒤에 숫자를 붙혀주기 위해 미리 확장자랑 분리시켜 놓기)
		// 우선 "."의 위치를 알아내자
		int period = fileName.lastIndexOf("."); // test12.txt -> 6 반환

		String f_name = fileName.substring(0, period); // test12
		String suffix = fileName.substring(period); // .txt

		// 전체경로(절대경로+파일명) 만들기
		// "/" 대신에 System.getProperty("file.separator")를 쓰면 운영체제마다 경로를 다르게 반환 (Windows:
		// \, Linux: /) -> /를 사용해도 다 되긴 함
		String saveFilePath = path + System.getProperty("file.separator") + fileName;

		// 위의 전체경로를 가지고 파일객체 생성
		File f = new File(saveFilePath);
		// 파일이 이미 있다면 파일명 뒤에 숫자를 붙이기 위해 변수를 하나 준비하자.
		int idx = 1;

		while (f != null && f.exists()) {
			StringBuffer sb = new StringBuffer();
			sb.append(f_name);
			sb.append("(");
			sb.append(idx++);
			sb.append(")");
			sb.append(suffix);

			fileName = sb.toString(); // test121.txt

			saveFilePath = path + System.getProperty("file.separator") + fileName;

			// 바뀐 파일명을 가지고 다시 File객체 생성
			f = new File(saveFilePath);
		}

		return fileName;
	}
}