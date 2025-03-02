import { DateNotifier } from "./DateNotifier";
import InputBar from "./InputBar";
import Message from "./Message";

export default function Discussions(){
    return (
        <div className="w-full flex flex-col h-full" >
            <div>
                <Message message={
                    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem quibusdam et eaque nisi maiores fugiat asperiores laboriosam quaerat ab magnam fuga ratione alias, vitae, hic officiis natus non distinctio tempora."
                }
                date={new Date()}
                />

                <Message
                date={new Date()}
                own
                message={
                    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem quibusdam et eaque nisi maiores fugiat asperiores laboriosam quaerat ab magnam fuga ratione alias, vitae, hic officiis natus non distinctio tempora."
                } />
                <DateNotifier date={new Date()}/>
                <Message message={
                    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem quibusdam et eaque nisi maiores fugiat asperiores laboriosam quaerat ab magnam fuga ratione alias, vitae, hic officiis natus non distinctio tempora."
                }
                date={new Date()}
                />

                <Message
                date={new Date()}
                own
                message={
                    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem quibusdam et eaque nisi maiores fugiat asperiores laboriosam quaerat ab magnam fuga ratione alias, vitae, hic officiis natus non distinctio tempora."
                } />
            </div>
        </div>
    )
}