import styled from 'styled-components'

export const PageArea = styled.div`
    form {
        background-color: #FFF;
        border-radius: 5px;
        padding: 10px;
        box-shadow: 0px 0px 5px #999;
        margin-bottom: 20px;
        max-width: 80%;

        .area {
            display: flex;
            align-items: center;
            padding: 10px;

            .area--title {
                width: 200px;
                text-align: right;
                padding-right: 22px;
                font-weight: bold;
                font-size: 14px;
            }

            .area--input {
                flex: 1;

                input, select, textarea  {
                    width: 100%;
                    font-size: 14px;
                    padding: 6px;
                    border: 1px solid #DDD;
                    border-radius: 3px;
                    outline: none;
                    transition: all ease 0.2s;

                    &:focus {
                        border: 1px solid #324;
                        color: #333;
                    }
                }

                textarea {
                    height: 150px;
                    resize: none;
                }

                button {
                    background-color: #0089FF;
                    border: 0;
                    outline: 0;
                    padding: 5px 10px;
                    border-radius: 4px;
                    color: #FFF;
                    font-size: 16px;
                    cursor: pointer;

                    &:hover {
                        background-color: #006FCE;
                    }
                }
            }
        }
    }
`  
