import React, { useState, useEffect } from 'react';
import Header from "@/components/domain/Header";
import Navigation from "@/components/domain/Navigation";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';

function Board() {
    const [boardList, setBoardList] = useState([]);
    const [commentCnt, setCommentCnt] = useState([]);
    
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    useEffect(() => {
        fetch('/boards')
            .then(response => response.json())
            .then(data => {
                setBoardList(data.boardList);
                setCommentCnt(data.commentCnt);
            });
    }, []);

    return (
        <div>
            <Header />
            <Navigation />
            <br />
            <br />
            <br />
            <br />
            <h1 style={{
                color: "#F0E68C",
                backgroundColor: "#FFFFE0",
                fontSize: "3rem",
                textAlign: "center"
            }}>게시판 목록</h1>
            
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>글 번호</TableCell>
                        <TableCell>글 제목</TableCell>
                        <TableCell>작성자</TableCell>
                        <TableCell>작성일</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {boardList.map((board, index) => (
                        <TableRow key={board.bidx}>
                            <TableCell>{board.bidx}</TableCell>
                            <TableCell>{board.btitle} {commentCnt[index] !== 0 && `(${commentCnt[index]})`}</TableCell>
                            <TableCell>{board.memberVO.mnick}</TableCell>
                            <TableCell>{formatDate(board.insertDate)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Button
            variant="contained"
            color="primary"
                style={{ float: 'right' }}
            >
                글작성하기
            </Button>
        </div>
    );
}

export default Board;



// 글제목, 글내용 , = > console