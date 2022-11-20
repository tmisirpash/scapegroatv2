/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type { Groat, GroatInterface } from "../Groat";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint128",
        name: "_stake",
        type: "uint128",
      },
      {
        internalType: "uint8",
        name: "_maxPlayers",
        type: "uint8",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "partialFulfill",
        type: "bool",
      },
    ],
    name: "depositEth",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "groatIndex",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxPlayers",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "payout",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    name: "queue",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "queuePtr",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint8",
        name: "amount",
        type: "uint8",
      },
    ],
    name: "removeEntries",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "revealBlockNumber",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "stake",
    outputs: [
      {
        internalType: "uint128",
        name: "",
        type: "uint128",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405260016000556001600260126101000a81548160ff021916908360ff1602179055503480156200003257600080fd5b5060405162001aee38038062001aee83398181016040528101906200005891906200029f565b6000826fffffffffffffffffffffffffffffffff1611620000b0576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620000a79062000347565b60405180910390fd5b60018160ff1611620000f9576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620000f090620003b9565b60405180910390fd5b60006001826200010a91906200040a565b60ff16836200011a919062000475565b6fffffffffffffffffffffffffffffffff16146200016f576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016200016690620004fd565b60405180910390fd5b81600260006101000a8154816fffffffffffffffffffffffffffffffff02191690836fffffffffffffffffffffffffffffffff16021790555080600260106101000a81548160ff021916908360ff160217905550600181620001d291906200040a565b60ff1682620001e291906200051f565b82620001ef919062000557565b6fffffffffffffffffffffffffffffffff166001819055505050620005a2565b600080fd5b60006fffffffffffffffffffffffffffffffff82169050919050565b6200023b8162000214565b81146200024757600080fd5b50565b6000815190506200025b8162000230565b92915050565b600060ff82169050919050565b620002798162000261565b81146200028557600080fd5b50565b60008151905062000299816200026e565b92915050565b60008060408385031215620002b957620002b86200020f565b5b6000620002c9858286016200024a565b9250506020620002dc8582860162000288565b9150509250929050565b600082825260208201905092915050565b7f5374616b65206d757374206265206e6f6e2d7a65726f2e000000000000000000600082015250565b60006200032f601783620002e6565b91506200033c82620002f7565b602082019050919050565b60006020820190508181036000830152620003628162000320565b9050919050565b7f4d617820706c6179657273206d757374206265203e20312e0000000000000000600082015250565b6000620003a1601883620002e6565b9150620003ae8262000369565b602082019050919050565b60006020820190508181036000830152620003d48162000392565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000620004178262000261565b9150620004248362000261565b9250828203905060ff81111562000440576200043f620003db565b5b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b6000620004828262000214565b91506200048f8362000214565b925082620004a257620004a162000446565b5b828206905092915050565b7f5374616b652073686f756c642062652064697669646564206576656e6c792e00600082015250565b6000620004e5601f83620002e6565b9150620004f282620004ad565b602082019050919050565b600060208201905081810360008301526200051881620004d6565b9050919050565b60006200052c8262000214565b9150620005398362000214565b9250826200054c576200054b62000446565b5b828204905092915050565b6000620005648262000214565b9150620005718362000214565b925082820190506fffffffffffffffffffffffffffffffff8111156200059c576200059b620003db565b5b92915050565b61153c80620005b26000396000f3fe6080604052600436106100865760003560e01c80634c2412a2116100595780634c2412a21461014957806359fe06e01461017457806363bd1d4a1461019f57806378b77a94146101ca578063d69a18761461020757610086565b8063056d9f281461008b5780631eaeda03146100c85780632970ac44146100f35780633a4b66f11461011e575b600080fd5b34801561009757600080fd5b506100b260048036038101906100ad9190610d6c565b610223565b6040516100bf9190610dda565b60405180910390f35b3480156100d457600080fd5b506100dd610256565b6040516100ea9190610e0e565b60405180910390f35b3480156100ff57600080fd5b5061010861025c565b6040516101159190610e38565b60405180910390f35b34801561012a57600080fd5b5061013361026f565b6040516101409190610e7e565b60405180910390f35b34801561015557600080fd5b5061015e610291565b60405161016b9190610e38565b60405180910390f35b34801561018057600080fd5b506101896102a4565b6040516101969190610e38565b60405180910390f35b3480156101ab57600080fd5b506101b46102b7565b6040516101c19190610e0e565b60405180910390f35b3480156101d657600080fd5b506101f160048036038101906101ec9190610d6c565b6102bd565b6040516101fe9190610e38565b60405180910390f35b610221600480360381019061021c9190610ed1565b610654565b005b60036020528060005260406000206000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60005481565b600260119054906101000a900460ff1681565b600260009054906101000a90046fffffffffffffffffffffffffffffffff1681565b600260109054906101000a900460ff1681565b600260129054906101000a900460ff1681565b60015481565b6000808260ff1611610304576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102fb90610f5b565b60405180910390fd5b6000600260119054906101000a900460ff169050600260109054906101000a900460ff1660ff168160ff160361036f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161036690610fc7565b60405180910390fd5b6000805b8260ff168160ff1610801561038d57508460ff168260ff16105b15610543573373ffffffffffffffffffffffffffffffffffffffff16600360008360ff1660ff16815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff161461040f578061040890611016565b9050610373565b826104199061103f565b92508260ff168160ff16146104ba57600360008460ff1660ff16815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600360008360ff1660ff16815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505b73dead000000000000000042069420694206942069600360008560ff1660ff16815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508061053090611016565b90508161053c90611016565b9150610373565b82600260116101000a81548160ff021916908360ff16021790555060003373ffffffffffffffffffffffffffffffffffffffff168360ff16600260009054906101000a90046fffffffffffffffffffffffffffffffff166fffffffffffffffffffffffffffffffff166105b69190611068565b6040516105c2906110db565b60006040518083038185875af1925050503d80600081146105ff576040519150601f19603f3d011682016040523d82523d6000602084013e610604565b606091505b5050905080610648576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161063f9061113c565b60405180910390fd5b82945050505050919050565b600054431015610699576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161069090610fc7565b60405180910390fd5b60003490506000816fffffffffffffffffffffffffffffffff16116106f3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106ea90610f5b565b60405180910390fd5b6000600260009054906101000a90046fffffffffffffffffffffffffffffffff168261071f919061118b565b6fffffffffffffffffffffffffffffffff1614610771576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161076890611208565b60405180910390fd5b6000600260119054906101000a900460ff1690506000600260109054906101000a900460ff1690508060ff168260ff16036107ab57600091505b6000600260009054906101000a90046fffffffffffffffffffffffffffffffff16846107d79190611228565b9050600083836107e79190611259565b905060008160ff168360ff16106107fe5781610800565b825b9050868061081357508260ff168160ff16145b610852576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610849906112da565b60405180910390fd5b60008560ff16036108b0578360ff1644604051602001610872919061131b565b6040516020818303038152906040528051906020012060001c6108959190611336565b600260126101000a81548160ff021916908360ff1602179055505b80856108bc9190611367565b945084600260116101000a81548160ff021916908360ff1602179055508360ff168560ff16036108fa57604b436108f3919061139c565b6000819055505b8260ff168160ff1610156109ff5760003373ffffffffffffffffffffffffffffffffffffffff16600260009054906101000a90046fffffffffffffffffffffffffffffffff166fffffffffffffffffffffffffffffffff16838661095e9190611259565b60ff1661096b9190611068565b604051610977906110db565b60006040518083038185875af1925050503d80600081146109b4576040519150601f19603f3d011682016040523d82523d6000602084013e6109b9565b606091505b50509050806109fd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109f49061141c565b60405180910390fd5b505b610a15338287610a0f9190611259565b87610a1e565b50505050505050565b60008282610a2c9190611259565b60ff1667ffffffffffffffff811115610a4857610a4761143c565b5b604051908082528060200260200182016040528015610a765781602001602082028036833780820191505090505b509050600083905060005b8360ff168260ff161015610b8e57600360008360ff1660ff16815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16838260ff1681518110610adf57610ade61146b565b5b602002602001019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff168152505085600360008460ff1660ff16815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081610b7b90611016565b915080610b8790611016565b9050610a81565b600091505b82518260ff161015610d26576000838360ff1681518110610bb757610bb661146b565b5b60200260200101519050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614158015610c3e575073dead00000000000000004206942069420694206973ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614155b8015610c5f5750600260129054906101000a900460ff1660ff168660ff1614155b15610d145760008173ffffffffffffffffffffffffffffffffffffffff16600154604051610c8c906110db565b60006040518083038185875af1925050503d8060008114610cc9576040519150601f19603f3d011682016040523d82523d6000602084013e610cce565b606091505b5050905080610d12576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d09906114e6565b60405180910390fd5b505b82610d1e90611016565b925050610b93565b505050505050565b600080fd5b600060ff82169050919050565b610d4981610d33565b8114610d5457600080fd5b50565b600081359050610d6681610d40565b92915050565b600060208284031215610d8257610d81610d2e565b5b6000610d9084828501610d57565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610dc482610d99565b9050919050565b610dd481610db9565b82525050565b6000602082019050610def6000830184610dcb565b92915050565b6000819050919050565b610e0881610df5565b82525050565b6000602082019050610e236000830184610dff565b92915050565b610e3281610d33565b82525050565b6000602082019050610e4d6000830184610e29565b92915050565b60006fffffffffffffffffffffffffffffffff82169050919050565b610e7881610e53565b82525050565b6000602082019050610e936000830184610e6f565b92915050565b60008115159050919050565b610eae81610e99565b8114610eb957600080fd5b50565b600081359050610ecb81610ea5565b92915050565b600060208284031215610ee757610ee6610d2e565b5b6000610ef584828501610ebc565b91505092915050565b600082825260208201905092915050565b7f4e6565647320746f206265206e6f6e2d7a65726f2e0000000000000000000000600082015250565b6000610f45601583610efe565b9150610f5082610f0f565b602082019050919050565b60006020820190508181036000830152610f7481610f38565b9050919050565b7f47616d6520696e2070726f67726573732e000000000000000000000000000000600082015250565b6000610fb1601183610efe565b9150610fbc82610f7b565b602082019050919050565b60006020820190508181036000830152610fe081610fa4565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061102182610d33565b915060ff820361103457611033610fe7565b5b600182019050919050565b600061104a82610d33565b91506000820361105d5761105c610fe7565b5b600182039050919050565b600061107382610df5565b915061107e83610df5565b925082820261108c81610df5565b915082820484148315176110a3576110a2610fe7565b5b5092915050565b600081905092915050565b50565b60006110c56000836110aa565b91506110d0826110b5565b600082019050919050565b60006110e6826110b8565b9150819050919050565b7f5769746864726177616c206661696c65642e0000000000000000000000000000600082015250565b6000611126601283610efe565b9150611131826110f0565b602082019050919050565b6000602082019050818103600083015261115581611119565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b600061119682610e53565b91506111a183610e53565b9250826111b1576111b061115c565b5b828206905092915050565b7f4e6565647320746f206265206d756c7469706c65206f66207374616b652e0000600082015250565b60006111f2601e83610efe565b91506111fd826111bc565b602082019050919050565b60006020820190508181036000830152611221816111e5565b9050919050565b600061123382610e53565b915061123e83610e53565b92508261124e5761124d61115c565b5b828204905092915050565b600061126482610d33565b915061126f83610d33565b9250828203905060ff81111561128857611287610fe7565b5b92915050565b7f4578616374206f72646572206e6f74206d65742e000000000000000000000000600082015250565b60006112c4601483610efe565b91506112cf8261128e565b602082019050919050565b600060208201905081810360008301526112f3816112b7565b9050919050565b6000819050919050565b61131561131082610df5565b6112fa565b82525050565b60006113278284611304565b60208201915081905092915050565b600061134182610df5565b915061134c83610df5565b92508261135c5761135b61115c565b5b828206905092915050565b600061137282610d33565b915061137d83610d33565b9250828201905060ff81111561139657611395610fe7565b5b92915050565b60006113a782610df5565b91506113b283610df5565b92508282019050808211156113ca576113c9610fe7565b5b92915050565b7f526566756e64206661696c65642e000000000000000000000000000000000000600082015250565b6000611406600e83610efe565b9150611411826113d0565b602082019050919050565b60006020820190508181036000830152611435816113f9565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f5472616e73666572206661696c65642e00000000000000000000000000000000600082015250565b60006114d0601083610efe565b91506114db8261149a565b602082019050919050565b600060208201905081810360008301526114ff816114c3565b905091905056fea2646970667358221220523b7f5321d12a3ee6e2005386a763352a34a3deb945c2e1ba949501b7a1546864736f6c63430008110033";

type GroatConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: GroatConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Groat__factory extends ContractFactory {
  constructor(...args: GroatConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _stake: PromiseOrValue<BigNumberish>,
    _maxPlayers: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Groat> {
    return super.deploy(_stake, _maxPlayers, overrides || {}) as Promise<Groat>;
  }
  override getDeployTransaction(
    _stake: PromiseOrValue<BigNumberish>,
    _maxPlayers: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_stake, _maxPlayers, overrides || {});
  }
  override attach(address: string): Groat {
    return super.attach(address) as Groat;
  }
  override connect(signer: Signer): Groat__factory {
    return super.connect(signer) as Groat__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): GroatInterface {
    return new utils.Interface(_abi) as GroatInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Groat {
    return new Contract(address, _abi, signerOrProvider) as Groat;
  }
}
