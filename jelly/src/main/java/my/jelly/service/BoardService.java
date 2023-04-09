package my.jelly.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import my.jelly.dto.BoardPrevDTO;
import my.jelly.entity.Member;
import my.jelly.entity.jBoard;
import my.jelly.repository.BoardRepository;
import my.jelly.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Log4j2
public class BoardService {
    private final BoardRepository boardRepository;
    private final CommentRepository commentRepository;
    @Autowired
    MemberService memberService;

    //Read All List : 전체 글 리스트 조회
    public List<jBoard> getBoardAll() {
        //List<jBoard> list = boardRepository.findAll();
        List<jBoard> list = boardRepository.findAll();
        System.out.println(list);
        return list;
    }
    //Read All List : 전체 글 댓글 수 조회
   public List<Integer> getBoardCnt(){
        List<Integer> list2 = boardRepository.commentCnt();
        return list2;
   }
    // Create Board : 글 생성하기
    public void createBoard(Map<String, Object> board) {
        jBoard j = new jBoard();
        j.setBTitle((String) board.get("boardTitle"));
        j.setBContent((String)board.get("boardContent"));
        Member memberVO = memberService.findUser((String) board.get("memberAccount"));
        j.setMemberVO(memberVO);
        boardRepository.save(j);
    }
    // Update Board Before Read : 수정할 글 가져오기
    public jBoard getBoardBefore(Long bIdx) {
        jBoard j = new jBoard();
        j = boardRepository.findBybIdx(bIdx);
        System.out.println("=================================");
        System.out.println(j);
        return j;
    }
    // Update Board : 수정 글 받아와 처리
    public void updateBoard(Map<String, Object> board) {
        jBoard j = boardRepository.findBybIdx((Long) board.get("boardIdx"));
        j.setBTitle((String) board.get("boardTitle"));
        j.setBContent((String) board.get("boardContent"));
    }


    //글 댓글 목록 한꺼번에 조회 테스트ㅠㅠ
//    public List<BoardPrevDTO> getBoardTest() {
//        List<BoardPrevDTO> test1 = boardRepository.testCntAndList();
//        return test1;
//    }

//    public Map<String, Object> testCntComment() {
//        return commentRepository.commentCnt();
//    }

}
