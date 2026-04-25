import { GoChevronDown, GoChevronUp } from "react-icons/go";

export default function FAQItem({ index, question, answer, openQuestion, changeIndex }) {
    const isOpen = openQuestion === index;

    return (
        <div
            onClick={() => changeIndex(index)}
            style={{
                width: '90%',
                backgroundColor: '#252525',
                display: 'flex',
                flexDirection: 'column',
                padding: '10px',
                boxSizing: 'border-box',
                borderRadius: '5px',
                color: 'white',
                gap: '20px'
            }}
        >
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%'
            }}>
                <p style={{ fontWeight: 'bold', width: 'calc(100% - 30px)' }}>
                    {question}
                </p>

                <div style={{
                    width: '30px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    {
                        isOpen
                            ? <GoChevronUp color='white' size={20} />
                            : <GoChevronDown color='white' size={20} />
                    }
                </div>
            </div>

            {
                isOpen && (
                    <p style={{ fontSize: '16px', textAlign: 'justify' }}>
                        {answer}
                    </p>
                )
            }
        </div>
    );
}