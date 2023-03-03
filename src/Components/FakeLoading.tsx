
type Props = {
    height: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
}

export function FakeLoading({ height }: Props) {

    let fakeLoadingHeight: string = '';

    switch(height) {
        case 'sm' : 
            fakeLoadingHeight = 'h-[20px]';
            break;
        case 'md' : 
            fakeLoadingHeight = 'h-[30px]';
            break;
        case 'lg' : 
            fakeLoadingHeight = 'h-[50px]';
            break;
        case 'xl' : 
            fakeLoadingHeight = 'h-[100px]';
            break;
        case '2xl' : 
            fakeLoadingHeight = 'h-[200px]';
        break;
        case '3xl':
            fakeLoadingHeight = 'h-[300px]';
    }

    return(
        <div className={`bg-gradient-to-r from-slate-300 via-slate-100 to-slate-300 rounded shadow animate-gradient-x ${fakeLoadingHeight}`}></div>
        
    );
}