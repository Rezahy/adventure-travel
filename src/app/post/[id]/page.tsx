import Image from "next/image";
import ImageAsset from "@/../public/image-asset.jpeg";
import BlogBookmarkButton from "@/components/blog-bookmark-button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Heart, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import SharePostButton from "@/components/share-post-button";
import CommentForm from "@/components/comment-form";
import { Separator } from "@/components/ui/separator";
import CommentList from "@/components/comment-list";
const PostDetailsPage = () => {
	return (
		<>
			<section className="px-7 py-7 sm:px-10 pb-10">
				<div className="shadow overflow-hidden h-[70vh] relative rounded-xl group">
					<Image
						src={ImageAsset}
						alt="post"
						className="w-full h-full object-cover group-hover:scale-115 transition-all duration-500"
					/>
					<BlogBookmarkButton />
				</div>
				<div className="py-4">
					<div className="flex justify-between">
						<Badge variant="secondary" className="text-xs">
							{new Date().toDateString()}
						</Badge>
						<div className="flex space-x-4 text-sm">
							<Button variant="outline">
								<Heart />
								1000
								<span className="flex"></span>
							</Button>
							<Button variant="outline">
								<MessageSquare />
								100
							</Button>
						</div>
					</div>
					<h2 className="text-xl sm:text-2xl md:text-3xl font-bold py-6 pt-15">
						Blog Title
					</h2>
					<p className="text-justify leading-8 text-base md:text-lg text-gray-700 dark:text-gray-300">
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat
						temporibus eveniet molestiae quisquam, quo vitae nulla qui eum eius
						expedita dolorum quod provident suscipit quibusdam est atque a
						accusantium voluptas illum repellat cupiditate necessitatibus.
						Harum, voluptate voluptatum architecto modi excepturi quibusdam.
						Repudiandae quae reprehenderit temporibus debitis nulla impedit
						doloribus voluptas sed aliquid hic saepe, at corporis? Quidem
						impedit porro nulla unde possimus, architecto molestiae nihil
						expedita obcaecati, quae voluptates suscipit quisquam autem ullam
						natus consequatur voluptatum mollitia nam quasi assumenda ex magni
						dicta. Nesciunt, aperiam voluptate placeat voluptates facilis
						accusamus delectus at fuga officiis laudantium totam laborum eos
						eius quia, eligendi dicta doloremque et consequatur quis neque,
						excepturi nihil in voluptatibus. Quibusdam nihil nemo aut, enim,
						labore assumenda obcaecati amet unde minus atque incidunt optio
						alias? Laudantium, incidunt dolorem? Doloremque, animi quaerat odit
						at libero ullam blanditiis qui, minima optio nemo hic recusandae sed
						quibusdam dolores, eos nisi alias vitae officia. Culpa magnam et
						vero tempore praesentium nihil eligendi soluta beatae quam dolorem,
						eveniet laborum rem corrupti quasi atque perferendis perspiciatis.
						Aspernatur quia corporis quos, delectus iste dolorem eligendi.
						Reiciendis optio nemo, sapiente ratione qui, placeat magnam sed iste
						molestias et quas consequuntur, similique corporis delectus amet
						reprehenderit numquam quidem voluptatum dolorem eum quae debitis
						consectetur? Sint vel iste iure ex alias nostrum, repellendus vero
						fuga quaerat nemo id perferendis nisi unde quas voluptas. Dolor
						vitae debitis voluptas recusandae et eligendi nemo officiis harum
						odit iusto ut placeat, maxime repellat nulla, minima tenetur error,
						eum asperiores! Placeat beatae a ut deleniti dolores consectetur
						blanditiis earum minima praesentium quos nam magni nesciunt nisi
						autem, unde laborum ipsa eaque. Fuga, vel. Impedit autem a similique
						odio sequi temporibus, voluptates ullam! Amet dolore nostrum est
						inventore, debitis sunt, vitae quos tenetur reprehenderit enim quae
						cumque! Dolorem, repudiandae pariatur. Rem, in laudantium voluptatem
						reiciendis corrupti sunt provident illo magni labore a repudiandae
						dolore corporis quam. Mollitia amet possimus necessitatibus nisi non
						tempore totam, aut officia rem quis at autem ullam ipsam facilis!
						Qui dolorem provident eos at mollitia tempora earum facilis minus.
						Inventore, iure consequuntur omnis, quia corporis accusamus adipisci
						porro consequatur perspiciatis voluptate, libero corrupti. Eos
						pariatur tempore dolorem quaerat iusto perferendis vel esse
						repudiandae, rem sequi in quis voluptatum ut amet enim numquam fugit
						voluptatem ipsam impedit nulla voluptatibus. Explicabo expedita
						nesciunt ea repudiandae voluptate et cum quis consectetur adipisci,
						dolorem dolor non, maiores excepturi. Similique eius eligendi soluta
						tempora nisi quia, quisquam molestiae, placeat blanditiis architecto
						quos dolore reiciendis. Aspernatur magni explicabo suscipit omnis
						quisquam deserunt saepe, laborum impedit! Quaerat, praesentium
						officia. Ipsum, consequuntur quisquam aliquid provident illum
						accusamus recusandae porro odit atque saepe, similique ut suscipit
						omnis esse beatae? Facilis ex fugit sapiente commodi quam? Deserunt
						consectetur aspernatur ipsum expedita ex? Neque eligendi
						perspiciatis recusandae ut, fuga, officiis cupiditate dolores labore
						maxime provident, magni dignissimos minima nam hic. Recusandae ipsa
						voluptatem dolores accusantium aperiam aspernatur dignissimos
						reprehenderit ipsum quos aliquid nobis nesciunt quo fuga, voluptas
						impedit id distinctio obcaecati alias tempore reiciendis? Error est
						voluptatibus excepturi vel similique officia adipisci ut, voluptas
						temporibus eius animi esse harum magnam reiciendis voluptates
						accusamus eveniet ex ipsum quibusdam numquam dolores in velit!
						Molestiae ad laborum atque provident recusandae exercitationem
						nulla, inventore quasi. Neque aut fugit eum, ea, recusandae ducimus
						saepe sequi dolore magnam pariatur, sit aliquid tempore tenetur
						optio dolor? Voluptate aspernatur reprehenderit voluptatum nobis
						eveniet quibusdam harum voluptates at eos animi minus nisi dolorum
						odit nihil saepe, laboriosam quidem, quisquam corrupti corporis quia
						inventore facere. Cum, quae sit voluptatum ullam necessitatibus
						sequi quaerat reiciendis, ad quibusdam aperiam qui nam nihil
						reprehenderit modi error eaque, a totam voluptatem blanditiis
						labore. Vero perferendis magnam in quis vel et harum labore maxime!
						Similique rerum nobis rem neque accusamus possimus fugiat, aliquid
						molestiae natus deserunt enim, quisquam eum ullam magnam error
						libero illo maxime ut ducimus nesciunt repellat debitis nemo.
						Commodi, maxime modi. Nesciunt numquam autem asperiores beatae
						nostrum, laudantium minus consequuntur ipsam aspernatur?
						Voluptatibus neque dignissimos dolor sunt. Eum enim possimus
						incidunt voluptates? Totam cupiditate provident sequi placeat illum
						dolores hic quam? Ratione vel hic voluptas odio dolorum vero, harum
						a quae minus ipsum, id facilis, maxime ab cupiditate. Veniam odit,
						cum doloribus iusto mollitia numquam molestiae obcaecati, placeat
						officia repellat aliquam, in fuga autem quisquam beatae unde
						necessitatibus magni minima quam. Rerum nemo veritatis voluptas
						officia magnam similique quisquam, alias, libero animi corrupti modi
						neque suscipit deleniti consectetur! Consequatur aspernatur commodi,
						exercitationem, obcaecati iste itaque totam tempore aliquam
						accusamus excepturi nihil magni cum ipsa qui earum quam harum?
						Maxime porro distinctio unde quis! Quo id quia molestiae adipisci
						laboriosam perferendis pariatur quam, labore molestias ipsum harum
						natus tempora mollitia facere iure quidem optio vero ipsam amet.
						Minima aperiam, natus possimus vel harum optio rerum quisquam
						excepturi officiis rem nihil fuga. Ex, nulla quo? Necessitatibus
						nobis est error, esse culpa expedita molestiae dicta perferendis
						magnam minima similique amet recusandae exercitationem, laudantium
						quaerat quos soluta ab corporis, rem pariatur adipisci? Error
						recusandae rerum ipsam cupiditate optio facilis adipisci alias
						distinctio repellendus. Ullam labore laborum odio doloremque, quidem
						excepturi cum vero facilis molestias dolor placeat atque voluptatum,
						pariatur fugiat nobis nemo quo eaque inventore, est nesciunt eum?
						Ut, esse sint quasi officiis praesentium ea unde odit porro rerum ad
						distinctio. Pariatur ipsum, fuga recusandae suscipit asperiores
						quam! Asperiores, corporis vero quod ullam quasi accusamus
						voluptatum. Laborum error debitis eveniet, assumenda tempora ullam
						doloremque est possimus earum eaque quasi blanditiis optio ducimus
						unde porro ipsam dignissimos voluptatem. Perspiciatis magni at
						debitis consectetur neque eius asperiores sint ipsam tenetur ducimus
						beatae placeat enim, aliquid quo eligendi magnam quis a quidem aut
						consequatur amet necessitatibus eos natus? Nobis deserunt commodi
						rerum inventore quia quo incidunt possimus asperiores error iure
						cupiditate magnam aliquam recusandae expedita, vitae officia magni
						consectetur adipisci a temporibus, deleniti fugit qui autem.
						Adipisci cumque amet dolor culpa, aliquid esse atque doloribus
						labore, similique sit ullam totam excepturi, quod iusto sapiente
						explicabo suscipit non earum ea hic deserunt omnis minima vero.
						Consequatur earum, aspernatur numquam libero iure excepturi.
						Doloribus sed minus molestias pariatur blanditiis ipsa, impedit
						labore doloremque!
					</p>
				</div>
				<footer className="py-4 flex justify-between items-center">
					<div>
						<p className="italic">
							Written by
							<Link
								href="/profile/reza"
								className="hover:underline font-semibold cursor-pointer text-sm"
							>
								@reza
							</Link>
						</p>
					</div>
					<SharePostButton
						url="https://post.io"
						title="post-title"
						text="post text"
					/>
				</footer>
			</section>
			<Separator />
			<div className="px-7 py-7 sm:px-10 max-w-2xl">
				<h2 className="text-xl sm:text-2xl md:text-3xl font-bold pb-3">
					Comments
				</h2>
				<CommentForm />
				<CommentList />
			</div>
		</>
	);
};
export default PostDetailsPage;
